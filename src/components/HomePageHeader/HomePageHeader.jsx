import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { auth } from 'firebase.js'
import { termsAndConditions, privacyPolicy, impressum } from 'helpers.js'
import {
  HeaderContainer, NavBar, Logo, LogoImage, LogoAnchor,
  MainNavBar, MainNavBarElements, MainNavBarElementsLinks,
  ListContainer, DrawerItems
} from './styles'
import {
  Drawer, List,
  ListItem, ListItemText,
  Menu, MenuItem, Button, Dialog,
  DialogActions, DialogContent, DialogContentText,
  DialogTitle
} from '@material-ui/core'
import {
  LocalGroceryStore, Publish,
  AccountCircle, Settings, Dehaze
} from '@material-ui/icons'
// import logo from 'assets/jstore_logo.svg'
import StoreIcon from '@material-ui/icons/Store'

class HomePageHeader extends Component {
  state = {
    anchorEl: null,
    goTo: null,
    settings_dialog_items: {
      terms_and_condition: false,
      privacy_policy: false,
      impressum: false
    },
    drawerOpen: false,
    windowHeight: undefined,
    windowWidth: undefined
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
  }

  toggleDrawer = () => {
    this.setState((prevState) => ({
      drawerOpen: !prevState.drawerOpen
    }))
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        console.log('Logged out')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  handleClick = (e) => {
    this.setState({
      anchorEl: e.currentTarget
    })
  }

  handleOpenItem = (e) => {
    this.setState({
      anchorEl: null
    })
    switch (e.target.id) {
      case 'terms_and_condition':
        this.setState(prevState => ({
          settings_dialog_items: {
            ...prevState.settings_dialog_items,
            terms_and_condition: true
          }
        }))
        break
      case 'privacy_policy':
        this.setState(prevState => ({
          settings_dialog_items: {
            ...prevState.settings_dialog_items,
            privacy_policy: true
          }
        }))
        break
      case 'impressum':
        this.setState(prevState => ({
          settings_dialog_items: {
            ...prevState.settings_dialog_items,
            impressum: true
          }
        }))
        break
      case 'logout':
        this.logout()
        this.setState({
          goTo: '/'
        })
        break
      default:
        break
    }
  }

  handleCloseModal = (e) => {
    this.setState(prevState => ({
      settings_dialog_items: {
        terms_and_condition: false,
        privacy_policy: false,
        impressum: false
      }
    }))
  }

  goTo = (url) => {
    this.setState({
      goTo: url
    })
  }
  
  render() {
    const { goTo } = this.state
    if (this.state.goTo) {
      return <Redirect to={goTo} />
    }
    
    const open = Boolean(this.state.anchorEl)
    return (
      <React.Fragment>
        <HeaderContainer>
          <NavBar>
            <Logo>
              <LogoAnchor href="/home">
                {/* <LogoImage src={logo} /> */}
                <StoreIcon style={{color: '#004180', fontSize: '50px'}} />
              </LogoAnchor>
            </Logo>
            {
              this.state.windowWidth >= 768
              ?
              <MainNavBar>
              <MainNavBarElements>
                <MainNavBarElementsLinks href="/home">
                  <LocalGroceryStore />
                </MainNavBarElementsLinks>
                <MainNavBarElementsLinks href="/upload">
                  <Publish />
                </MainNavBarElementsLinks>
                {/* <MainNavBarElementsLinks>
                  <Notifications />
                </MainNavBarElementsLinks> */}
                <MainNavBarElementsLinks href="/profile">
                  <AccountCircle />
                </MainNavBarElementsLinks>
                <MainNavBarElementsLinks
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <Settings />
                </MainNavBarElementsLinks>
              </MainNavBarElements>
              </MainNavBar>
              :
              <MainNavBar>
                <MainNavBarElements>
                  <MainNavBarElementsLinks
                    onClick={this.toggleDrawer}
                  >
                    <Dehaze />
                  </MainNavBarElementsLinks>
                </MainNavBarElements>
              </MainNavBar>
            }
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              onClose={this.handleOpenItem}
            >
              <MenuItem id="terms_and_condition" onClick={this.handleOpenItem}>Terms and Conditions</MenuItem>
              <MenuItem id="privacy_policy" onClick={this.handleOpenItem}>Privacy Policy</MenuItem>
              <MenuItem id="impressum" onClick={this.handleOpenItem}>Impressum</MenuItem>
              <MenuItem id="feedback"><Link style={{textDecoration: 'none', color: 'black'}} to="/feedback" target="_blank">Feedback</Link></MenuItem>
              <MenuItem id="logout" onClick={this.handleOpenItem}>Log out</MenuItem>
            </Menu>
            <Dialog
              open={this.state.settings_dialog_items.terms_and_condition}
              onClose={this.handleCloseModal}
              scroll="paper"
              aria-labelledby="scroll-dialog-title"
            >
              <DialogTitle id="scroll-dialog-title">Terms and Conditions</DialogTitle>
              <DialogContent dividers={true}>
                <DialogContentText>
                  <Link to='/terms_and_conditions' target="_blank">{process.env.REACT_APP_BASE_URL}/terms_and_conditions</Link>
                  <br />
                  {termsAndConditions()}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseModal} color="primary">
                  Got it!
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={this.state.settings_dialog_items.privacy_policy}
              onClose={this.handleCloseModal}
              scroll="paper"
              aria-labelledby="scroll-dialog-title"
            >
              <DialogTitle id="scroll-dialog-title">Privacy Policy</DialogTitle>
              <DialogContent dividers={true}>
                <DialogContentText>
                  <Link to='/privacy_policy' target="_blank">{process.env.REACT_APP_BASE_URL}/privacy_policy</Link>
                  <br />
                  {privacyPolicy()}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseModal} color="primary">
                  Got it!
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={this.state.settings_dialog_items.impressum}
              onClose={this.handleCloseModal}
              scroll="paper"
              aria-labelledby="scroll-dialog-title"
            >
              <DialogTitle id="scroll-dialog-title">Impressum</DialogTitle>
              <DialogContent dividers={true}>
                <DialogContentText>
                  <Link to='/impressum' target="_blank">{process.env.REACT_APP_BASE_URL}/Impressum</Link>
                  <br />
                  {impressum()}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseModal} color="primary">
                  Got it!
                </Button>
              </DialogActions>
            </Dialog>
            <Drawer variant="temporary" anchor="bottom" open={this.state.drawerOpen} onClose={this.toggleDrawer}>
              <ListContainer role="presentation">
                <List>
                  <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button>
                      <DrawerItems>
                        <LocalGroceryStore />
                      </DrawerItems>
                      <ListItemText primary={'Buy'} />
                    </ListItem>
                  </Link>
                  <Link to="/upload" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button>
                      <DrawerItems>
                        <Publish />
                      </DrawerItems>
                      <ListItemText primary={'Sell'} />
                    </ListItem>
                  </Link>
                  <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button>
                      <DrawerItems>
                        <AccountCircle />
                      </DrawerItems>
                      <ListItemText primary={'Profile'} />
                    </ListItem>
                  </Link>
                  <ListItem button onClick={this.handleClick}>
                    <DrawerItems>
                      <Settings />
                    </DrawerItems>
                    <ListItemText primary={'Settings'} />
                  </ListItem>
                </List>
              </ListContainer>
            </Drawer>
          </NavBar>
        </HeaderContainer>
      </React.Fragment>
    )
  }
}

export default HomePageHeader
