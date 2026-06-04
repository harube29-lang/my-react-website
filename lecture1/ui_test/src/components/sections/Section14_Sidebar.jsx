import { useState } from 'react'
import {
  Box, Typography, Divider, Button, Stack, ToggleButton, ToggleButtonGroup,
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Chip, IconButton,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ArticleIcon from '@mui/icons-material/Article'
import BarChartIcon from '@mui/icons-material/BarChart'
import PeopleIcon from '@mui/icons-material/People'
import FolderIcon from '@mui/icons-material/Folder'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'

const navLinks = [
  { label: '홈',        icon: <HomeIcon />,      badge: null },
  { label: '대시보드',  icon: <DashboardIcon />,  badge: null },
  { label: '게시글',    icon: <ArticleIcon />,    badge: '12' },
  { label: '통계',      icon: <BarChartIcon />,   badge: null },
  { label: '사용자',    icon: <PeopleIcon />,     badge: '3' },
  { label: '파일',      icon: <FolderIcon />,     badge: null },
]

const Section14_Sidebar = () => {
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState('left')
  const [activeLink, setActiveLink] = useState('홈')

  const handleAnchor = (_, val) => { if (val) setAnchor(val) }

  const handleLink = (label) => {
    setActiveLink(label)
    setOpen(false)
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        14. Sidebar
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        MUI Drawer — 왼쪽/오른쪽 토글, List 네비게이션, 활성 메뉴 표시
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
        <ToggleButtonGroup
          value={anchor}
          exclusive
          onChange={handleAnchor}
          size="small"
        >
          <ToggleButton value="left">← 왼쪽</ToggleButton>
          <ToggleButton value="right">오른쪽 →</ToggleButton>
        </ToggleButtonGroup>

        <Button
          variant="contained"
          startIcon={<MenuIcon />}
          onClick={() => setOpen(true)}
        >
          사이드바 열기
        </Button>

        <Typography variant="body2" color="text.secondary">
          현재 선택: <strong>{activeLink}</strong>
        </Typography>
      </Stack>

      <Drawer
        anchor={anchor}
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { width: 260 } } }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* 헤더 */}
          <Box
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              px: 2, py: 1.5, bgcolor: 'primary.main', color: 'white',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.dark', fontSize: 14 }}>
                M
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={700}>MyApp</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>관리자 패널</Typography>
              </Box>
            </Stack>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* 네비게이션 */}
          <List sx={{ flexGrow: 1, py: 1 }}>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  selected={activeLink === link.label}
                  onClick={() => handleLink(link.label)}
                  sx={{
                    mx: 1, borderRadius: 1.5,
                    '&.Mui-selected': {
                      bgcolor: 'primary.50',
                      color: 'primary.main',
                      '& .MuiListItemIcon-root': { color: 'primary.main' },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.label} />
                  {link.badge && (
                    <Chip label={link.badge} size="small" color="primary" sx={{ height: 20, fontSize: 11 }} />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          {/* 하단 설정 */}
          <List sx={{ py: 1 }}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ mx: 1, borderRadius: 1.5 }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon sx={{ minWidth: 40 }}><SettingsIcon /></ListItemIcon>
                <ListItemText primary="설정" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section14_Sidebar
