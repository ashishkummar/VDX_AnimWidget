import { useDispatch } from 'react-redux';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import * as ActionType from './redux/ActionTypes';

const Alrt = (props)=>{   


     const dispatch = useDispatch();

    

 if(props.value){ 
	return (
        <Alert  variant="filled" severity="error"   className={props.className}  onClose={() => {
            dispatch({
                 type:ActionType.SHOWHIDE_ALERT,
	             payload:false
            })
        }}>{props.value}</Alert>
	)
 }else{
    return (
        <Alert  variant="filled" severity="error" style={{display:'none'}}  className={props.className}  onClose={() => {
            dispatch({
                 type:ActionType.SHOWHIDE_ALERT,
	             payload:false
            })
        }}>{props.value}</Alert>
	)
 }

}

export default Alrt;