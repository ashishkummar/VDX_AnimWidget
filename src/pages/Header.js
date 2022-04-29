import React from 'react';
import Btn from './Button';
import { connect } from 'react-redux';

import { Grid, Hidden, makeStyles } from '@material-ui/core';

import Modal from 'react-modal';
import ModalHelp from './ModalHelp';
import Alrt from './Alert';
import { CenterFocusStrong } from '@material-ui/icons';

const useStyles = makeStyles({
	main:{
		backgroundImage:'linear-gradient(to bottom, #6baee1, #4488c0)',
		padding:10
	},
	title:{
		color:'white',
		fontSize:24
	},
	help : {
		position:'absolute',
		width:600,
		height:400,
		top:(window.innerHeight-400)/2,
		left:(window.innerWidth-600)/2
	},
	alert:{
		display:"flex",
		opacity:.9,
		height:'15px',
	    alignItems:"center"
		 			    
 	}
});

const Header = (props)=>{
	 
    const classes = useStyles();
	const [modal, handlModel] = React.useState({open:false, child:''});
	Modal.setAppElement('#root')
 
	return(
		<>
 			<Grid container direction="row" justifyContent="space-between" alignItems="center" className={classes.main}>
				<div className={classes.title}> {props.content} </div>				
				<Alrt className={classes.alert} value={props.isAlertVisible}></Alrt>
				<Btn value={{id:0, variant:"contained", color:"primary", value:"help"}} 
						click={()=>handlModel({open:true,child:'help'})} />
			</Grid>

			<Modal isOpen={modal.open} contentLabel="Example Modal" className={classes.help}>
				{
					modal.child==='help' && <ModalHelp click={()=>handlModel({...modal, open:false})}></ModalHelp>
				}
			</Modal>
		</>
	)
 

}


const mapStateToProps = state => {
	return {
		


		isAlertVisible:state.isAlertVisible
		  
	}
}

export default connect(mapStateToProps, null) (Header);


