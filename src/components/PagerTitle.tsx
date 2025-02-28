import { Box, Divider, Typography } from '@mui/material';

export interface PagerTitleProps {
    title: string|React.ReactNode;
    right?: React.ReactNode;
}

export default function PagerTitle({title, right}: PagerTitleProps) {
    return <>
    <Box sx={{display:'flex'}}>
        <Typography variant="h4" component="h4" gutterBottom sx={{
            fontWeight: 700,
            fontSize: '23px',
            color: '#0070C0',
            marginBottom: '15px',
            flex:1
        }}>
            {title}
        </Typography>
        {right && <Box>{right}</Box>}
    </Box>
    <Divider sx={{ mb: 2 }} />
    </>
}