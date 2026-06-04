import { useState, useRef } from 'react'
import { Box, Typography, Divider, Paper, Chip } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

const INITIAL_ITEMS = [
  { id: 1, label: '⚛️ React', color: '#e3f2fd' },
  { id: 2, label: '🔷 TypeScript', color: '#e8f5e9' },
  { id: 3, label: '⚡ Vite', color: '#fff8e1' },
  { id: 4, label: '🎨 MUI', color: '#fce4ec' },
  { id: 5, label: '🛣️ Router', color: '#f3e5f5' },
]

const Section10_DragDrop = () => {
  const [sourceItems, setSourceItems] = useState(INITIAL_ITEMS)
  const [dropItems, setDropItems] = useState([])
  const [draggingId, setDraggingId] = useState(null)
  const [overZone, setOverZone] = useState(null)
  const dragItem = useRef(null)
  const dragFrom = useRef(null)

  const handleDragStart = (item, from) => {
    dragItem.current = item
    dragFrom.current = from
    setDraggingId(item.id)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    setOverZone(null)
  }

  const handleDrop = (to) => {
    const item = dragItem.current
    const from = dragFrom.current
    if (!item || from === to) return

    if (from === 'source') {
      setSourceItems((prev) => prev.filter((i) => i.id !== item.id))
      setDropItems((prev) => [...prev, item])
    } else {
      setDropItems((prev) => prev.filter((i) => i.id !== item.id))
      setSourceItems((prev) => [...prev, item])
    }
    dragItem.current = null
    dragFrom.current = null
  }

  const handleReset = () => {
    setSourceItems(INITIAL_ITEMS)
    setDropItems([])
  }

  const ItemChip = ({ item, from }) => (
    <Box
      draggable
      onDragStart={() => handleDragStart(item, from)}
      onDragEnd={handleDragEnd}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1.5,
        py: 0.75,
        borderRadius: 2,
        bgcolor: item.color,
        border: '1.5px solid',
        borderColor: draggingId === item.id ? 'primary.main' : 'divider',
        cursor: 'grab',
        userSelect: 'none',
        opacity: draggingId === item.id ? 0.4 : 1,
        transform: draggingId === item.id ? 'scale(0.95)' : 'scale(1)',
        transition: 'opacity 0.15s, transform 0.15s, box-shadow 0.15s',
        boxShadow: draggingId === item.id ? 3 : 0,
        '&:hover': { boxShadow: 2, borderColor: 'primary.light' },
        '&:active': { cursor: 'grabbing' },
      }}
    >
      <DragIndicatorIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
      <Typography variant="body2" fontWeight={500}>{item.label}</Typography>
    </Box>
  )

  const DropZone = ({ zone, items, label, emptyText }) => (
    <Paper
      variant="outlined"
      onDragOver={(e) => { e.preventDefault(); setOverZone(zone) }}
      onDragLeave={() => setOverZone(null)}
      onDrop={() => { handleDrop(zone); setOverZone(null) }}
      sx={{
        flex: 1,
        minHeight: 160,
        p: 2,
        borderRadius: 2,
        borderStyle: 'dashed',
        borderColor: overZone === zone ? 'primary.main' : 'divider',
        bgcolor: overZone === zone ? 'primary.50' : 'background.paper',
        transition: 'border-color 0.15s, background-color 0.15s',
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, fontWeight: 600 }}>
        {label}
        <Chip label={items.length} size="small" sx={{ ml: 1, height: 18, fontSize: 11 }} />
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: 80, alignContent: 'flex-start' }}>
        {items.length === 0 ? (
          <Typography variant="caption" color="text.disabled" sx={{ alignSelf: 'center', width: '100%', textAlign: 'center', mt: 2 }}>
            {emptyText}
          </Typography>
        ) : (
          items.map((item) => <ItemChip key={item.id} item={item} from={zone} />)
        )}
      </Box>
    </Paper>
  )

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        10. Drag &amp; Drop
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        HTML5 DnD API — 아이템을 드래그해 오른쪽 영역으로 이동, 다시 되돌리기 가능
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <DropZone zone="source" items={sourceItems} label="📦 아이템 목록" emptyText="모두 이동했어요!" />
        <DropZone zone="drop" items={dropItems} label="✅ 선택 목록" emptyText="여기로 드래그하세요" />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography
          variant="caption"
          color="primary"
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={handleReset}
        >
          초기화
        </Typography>
      </Box>

      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

export default Section10_DragDrop
