import React, { useContext, useState } from 'react'
import { TextField,Typography, Grid , Button , FormControl, InputLabel, Select , MenuItem } from '@material-ui/core'
import useStyles from './styles'
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 } from 'uuid';
import { incomeCategories,expenseCategories } from '../../../constants/categories';
import formatDate from '../../../utils/formatDate';
const initialState = { 
  amount:'',
  category:'',
  type:'Income',
  date:formatDate(new Date())
}
const Form = () => {
  const [transaction,setTransaction] = useState(initialState);
  const classes = useStyles();
  const ctx = useContext(ExpenseTrackerContext);
  const {addTransaction} = ctx;
  const selectedCateg = transaction.type==="Income"?incomeCategories:expenseCategories
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} >
        <Typography align='center' variant='subtitle2' gutterBottom>
          ....
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel >Type</InputLabel>
          <Select value = {transaction.type} onChange={(e)=>{
            setTransaction(prev=> ({...prev,type:e.target.value}))
          }} >
            <MenuItem value='Income'>Income</MenuItem>
            <MenuItem value='Expense'>Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value = {transaction.category} onChange={(e)=>{
            setTransaction(prev=> ({...prev,category:e.target.value}))
          }}>
            {selectedCateg.map(cat=><MenuItem key={cat.type} value={cat.type}>{cat.type}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField type={'number'} label='Amount'fullWidth value={transaction.amount} onChange={(e)=>{
            setTransaction(prev=> ({...prev,amount:+e.target.value}))
          }}/>
      </Grid>     
       <Grid item xs={6}>
        <TextField value={transaction.date} type={'date'} label='Date'fullWidth onChange={(e)=>{
            setTransaction(prev=> ({...prev,date:formatDate(e.target.value)}))
          }}/>
      </Grid>
      <Button className={classes.button} variant='outlined' color='primary' fullWidth 
      onClick={(e)=>{
        e.preventDefault();
        const trans = {...transaction , id: v4()}
        addTransaction(trans)
        setTransaction(initialState)
      }}
      >Create</Button>
    </Grid>
    
  )
}

export default Form