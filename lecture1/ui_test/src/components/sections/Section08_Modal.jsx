import { useState } from 'react'
import {
  Box, Typography, Divider, Button, Stack,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Section08_Modal = () => {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState(null)

  const handleOpen = () => {
    setResult(null)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const handleConfirm = () => {
    setResult('확인')
    setOpen(false)
  }
  const handleCancel = () => {
    setResult('취소')
    setOpen(false)
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        08. Modal
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Dialog — 버튼으로 열기, 닫기 버튼 / 배경 클릭 / 확인·취소로 닫기
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="contained" onClick={handleOpen}>
          모달 열기
        </Button>
        {result && (
          <Typography variant="body2" color="text.secondary">
            마지막 선택: <strong>{result === '확인' ? '✅ 확인' : '❌ 취소'}</strong>
          </Typography>
        )}
      </Stack>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pr: 6 }}>
          🗂️ 작업을 진행하시겠습니까?
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ position: 'absolute', top: 12, right: 12 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText>
            이 작업은 되돌릴 수 없습니다. 선택한 항목이 영구적으로 변경되며,
            관련된 데이터에도 영향을 줄 수 있습니다.
          </DialogContentText>
          <DialogContentText sx={{ mt: 1.5 }}>
            계속 진행하시려면 <strong>확인</strong>을, 취소하시려면{' '}
            <strong>취소</strong>를 눌러주세요.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button variant="outlined" color="inherit" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section08_Modal
