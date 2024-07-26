import { Grid, Typography } from '@mui/material'
import React from 'react'
import Orders from '../components/Orders'

export const OrdersView = () => {
  return (
    <Grid container direction='row' justifyContent='space-between' sx={{mb:1}}>
      <Grid item>
        <Typography>22/07/2024</Typography>
        <Orders/>
      </Grid>
    </Grid>
  )
}
