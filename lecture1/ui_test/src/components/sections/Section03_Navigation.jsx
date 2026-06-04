import { useState } from 'react'
import {
  Box, Typography, Divider,
  AppBar, Toolbar, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  useMediaQuery, useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const menus = ['홈', '소개', '서비스', '연락처']

const Section03_Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleMenuClick = (menu) => {
    alert(`메뉴 클릭: ${menu}`)
    setDrawerOpen(false)
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        03. Navigation
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        AppBar + Toolbar — 데스크톱: 가로 메뉴 / 모바일(600px 이하): 햄버거 메뉴
      </Typography>

      <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
              MyApp
            </Typography>

            {isMobile ? (
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Box>
                {menus.map((menu) => (
                  <Button key={menu} color="inherit" onClick={() => handleMenuClick(menu)}>
                    {menu}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220 }}>
          <List>
            {menus.map((menu) => (
              <ListItem key={menu} disablePadding>
                <ListItemButton onClick={() => handleMenuClick(menu)}>
                  <ListItemText primary={menu} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section03_Navigation
