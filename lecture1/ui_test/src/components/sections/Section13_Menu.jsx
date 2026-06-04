import { useState } from 'react'
import {
  Box, Typography, Divider, Button, Stack, Paper, Chip,
  Menu, MenuItem, ListItemIcon, ListItemText,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import LogoutIcon from '@mui/icons-material/Logout'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const menuItems = [
  { label: '홈',       icon: <HomeIcon fontSize="small" />,          color: 'primary' },
  { label: '프로필',   icon: <PersonIcon fontSize="small" />,         color: 'info' },
  { label: '알림',     icon: <NotificationsIcon fontSize="small" />,  color: 'warning' },
  { label: '즐겨찾기', icon: <BookmarkIcon fontSize="small" />,       color: 'secondary' },
  { label: '설정',     icon: <SettingsIcon fontSize="small" />,       color: 'default' },
  { label: '로그아웃', icon: <LogoutIcon fontSize="small" />,         color: 'error' },
]

const Section13_Menu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selected, setSelected] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpen = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleSelect = (item) => {
    setSelected(item)
    handleClose()
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        13. Menu
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        MUI Menu + MenuItem — 아이콘 포함 6개 항목, 선택값 표시
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <Button
          variant="contained"
          endIcon={<KeyboardArrowDownIcon
            sx={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          />}
          onClick={handleOpen}
          id="menu-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          메뉴 열기
        </Button>

        {selected && (
          <Chip
            icon={selected.icon}
            label={selected.label}
            color={selected.color === 'default' ? undefined : selected.color}
            variant="outlined"
          />
        )}
      </Stack>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'menu-button' }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        slotProps={{
          paper: { elevation: 3, sx: { mt: 0.5, minWidth: 180, borderRadius: 2 } },
        }}
      >
        {menuItems.map((item, idx) => (
          <MenuItem
            key={item.label}
            onClick={() => handleSelect(item)}
            selected={selected?.label === item.label}
            divider={idx === menuItems.length - 2}
            sx={{
              color: item.color === 'error' ? 'error.main' : 'text.primary',
              '&.Mui-selected': { bgcolor: 'action.selected' },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      {selected && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2, maxWidth: 300, bgcolor: 'background.paper' }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            선택된 메뉴
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {selected.label} 페이지로 이동합니다.
          </Typography>
        </Paper>
      )}

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section13_Menu
