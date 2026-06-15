import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { supabase } from '../../lib/supabase'

const formatDate = (iso) => {
  const d = new Date(iso)
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`
}

const EntryCard = ({ entry }) => (
  <Box
    sx={{
      bgcolor: '#FFFFFF',
      borderRadius: '0 12px 12px 0',
      borderLeft: '2px solid rgba(255,122,0,0.35)',
      border: '1px solid #F3F4F6',
      borderLeftColor: 'rgba(255,122,0,0.35)',
      p: { xs: 2.5, md: 3 },
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        transform: 'translateY(-1px)',
      },
    }}
  >
    {/* 상단: 아바타 + 이름 + 날짜 */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
      <Box
        sx={{
          width: 38, height: 38, borderRadius: '10px',
          bgcolor: '#FFF4EB',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.15rem', flexShrink: 0,
        }}
      >
        {entry.emoji || '🚀'}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 600, color: '#1F2937', fontSize: '0.88rem', lineHeight: 1.3 }}>
          {entry.author_name}
        </Typography>
        {entry.affiliation && (
          <Typography variant="caption" sx={{ color: '#FF7A00', fontWeight: 500, display: 'block', mt: 0.2 }}>
            {entry.affiliation}
          </Typography>
        )}
      </Box>
      <Typography variant="caption" sx={{ color: '#C4C9D4', flexShrink: 0, fontSize: '0.7rem', fontWeight: 400 }}>
        {formatDate(entry.created_at)}
      </Typography>
    </Box>

    {/* 메시지 */}
    <Typography
      variant="body2"
      sx={{ color: '#374151', lineHeight: 1.8, wordBreak: 'keep-all', whiteSpace: 'pre-wrap', fontWeight: 400 }}
    >
      {entry.message}
    </Typography>

    {/* 별점 + 키워드 */}
    {(entry.rating > 0 || entry.keyword) && (
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mt: 1.5, flexWrap: 'wrap' }}>
        {entry.rating > 0 && (
          <Typography sx={{ fontSize: '0.82rem', color: '#FF7A00', letterSpacing: 1 }}>
            {'★'.repeat(entry.rating)}{'☆'.repeat(5 - entry.rating)}
          </Typography>
        )}
        {entry.keyword && (
          <Box
            sx={{
              display: 'inline-block',
              bgcolor: '#FFF4EB', color: '#FF7A00',
              fontSize: '0.7rem', fontWeight: 600,
              px: 1.2, py: 0.4, borderRadius: '6px',
              border: '1px solid #FFD9B3',
            }}
          >
            {entry.keyword}
          </Box>
        )}
      </Box>
    )}

    {/* 메타 태그 */}
    {(entry.region || entry.age_group || entry.how_found) && (
      <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap', mt: 1.2 }}>
        {[entry.region, entry.age_group, entry.how_found].filter(Boolean).map(tag => (
          <Box
            key={tag}
            sx={{
              fontSize: '0.65rem', color: '#B0B7C3',
              bgcolor: '#F9FAFB', border: '1px solid #EFEFEF',
              px: 0.9, py: 0.25, borderRadius: '6px',
            }}
          >
            {tag}
          </Box>
        ))}
      </Box>
    )}

    {/* 이메일 (공개 시) */}
    {entry.is_public_email && entry.email && (
      <Typography variant="caption" sx={{ color: '#C4C9D4', mt: 1.2, display: 'block', fontWeight: 400 }}>
        📧 {entry.email}
      </Typography>
    )}
  </Box>
)

const GuestbookList = ({ refresh }) => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('guestbook')
        .select('id, author_name, message, affiliation, email, is_public_email, emoji, created_at, keyword, rating, region, age_group, how_found')
        .order('created_at', { ascending: false })
      setEntries(data || [])
      setLoading(false)
    }
    load()
  }, [refresh])

  if (loading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {[1, 2, 3].map(i => (
        <Skeleton key={i} variant="rectangular" height={90} sx={{ borderRadius: '0 12px 12px 0', bgcolor: '#F3F4F6' }} />
      ))}
    </Box>
  )

  if (entries.length === 0) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography sx={{ fontSize: '2.2rem', mb: 1.5 }}>💬</Typography>
      <Typography variant="body2" sx={{ color: '#9CA3AF', fontWeight: 500 }}>아직 방명록이 없어요.</Typography>
      <Typography variant="caption" sx={{ color: '#C4C9D4', mt: 0.5, display: 'block' }}>첫 번째 방명록을 남겨주세요!</Typography>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography variant="caption" sx={{ color: '#C4C9D4', fontWeight: 500 }}>
        총 {entries.length}개
      </Typography>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </Box>
  )
}

export default GuestbookList
