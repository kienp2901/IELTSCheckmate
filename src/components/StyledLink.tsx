import { styled } from "@mui/material"
import { Link } from "react-router"
export const StyledLink = styled(Link)(({theme}) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main,
    flex:1,
    '&:hover': {
        textDecoration: 'none',
    },
    '&:visited': {
        color: theme.palette.primary.main,
    },
    '&:active': {
        color: theme.palette.primary.main,
    },
}));


