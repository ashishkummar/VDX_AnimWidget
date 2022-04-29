import React from 'react';
import { connect, useDispatch } from 'react-redux';

import {Grid, makeStyles, Button} from '@material-ui/core';
import * as ActionType from './redux/ActionTypes';

import DownloadFile from './utils/DownloadFile';
import UploadFile from './utils/UploadFile';

import { InspectForAnim, CharPairChecker} from  "./utils/DapiInspector"; 

 

const useStyles = makeStyles({
	btn:{
		display:'flex',
		justifyContent:'center',
		alignItems:'center',
		background:'#303F9F',
		borderRadius:'4px',
		color:'white',
		width:'120px',
		height:'37px'
	},
	btnUpload:{
		position:'absolute', 
		opacity:0, 
		width:'120px', 
		height:'37px'
	}
})

const arrBtns = [{id:1, variant:"contained", color:"primary", value:"Download"}];
const getDapi = (mobile, str) => {
	let dstr = '';
	let tstr = '';
	let left = 0;
	if(mobile){
		left = 2;
		dstr = str.split('onCardChange')[0];
		dstr += 'onCardChange';
		tstr = str.split('onCardChange')[1];

		for(let j=0; j<tstr.length; j++){
			dstr += tstr[j];
			if(tstr[j] === '{'){ left += 1; }
			if(tstr[j] === '}'){ left -= 1; }

			if(left === 0){ break; }
		}
	}else{
		left = 2;
		dstr = str.split('videoCarouselPrev')[0];
		dstr += 'videoCarouselPrev';
		tstr = str.split('videoCarouselPrev')[1];

		for(let k=0; k<tstr.length; k++){
			dstr += tstr[k];
			if(tstr[k] === '{'){ left += 1; }
			if(tstr[k] === '}'){ left -= 1; }

			if(left === 0){ break; }
		}
	}

	return dstr+'\n~\n]}';
}

const BtnHolder = (props)=>{
    const classes = useStyles();
	const dispatch = useDispatch(); 

	const fileDownloaded = () => {
		console.log('fileDownloaded');
	}

	const fileUploaded = (arrVal, isMobile, dapi, rawDapi) => {
		
	

		props.components.forEach(obj => {
			let str = isMobile && obj.key==="scrollbar" ? dapi.split('"'+obj.key+'"')[2] : dapi.split('"'+obj.key+'"')[1];
			let tstr = '';

			if(str !== undefined){				
				tstr += '{ name:"'+obj.key+'"';
				let left = 1;
				let index = 0;
				obj.selected = true;
	
				while(index<str.length){
					tstr += str[index];
					if(str[index] === '{'){ left += 1; }
					if(str[index] === '}'){ left -= 1; }
					index++;
					if(left === 0){ break; }
				}

				dapi = dapi.replace(tstr, '');
			}

			obj.code = tstr;
		});


		dapi = getDapi(isMobile, dapi);
		props.fileUploaded(arrVal, isMobile, dapi, [...props.components]);


     // Using DapiInspector.js to scan the designer-config code.
	 dispatch({
		type:ActionType.SHOWHIDE_ALERT,
		payload: false
	})
	
	let _chkAminNcompoPresence = InspectForAnim (rawDapi)
		
	if(_chkAminNcompoPresence.status){	
		dispatch({
			type:ActionType.SHOWHIDE_ALERT,
			payload: _chkAminNcompoPresence.message
		})
	}	 

	let _chkSyntaxErrDapi = CharPairChecker(rawDapi, "{}")
	if(!_chkSyntaxErrDapi.status){	
		dispatch({
			type:ActionType.SHOWHIDE_ALERT,
			payload: _chkSyntaxErrDapi.message
		}) 
	}
	 
    //Cheking [] only in Animation Code, const motionWidget = {
	let onlyAnimRawData = rawDapi.replace(/[\s\t]+/gm, '').split("constmotionWidget=")[1];   
	//console.info(onlyAnimRawData);	
	if(onlyAnimRawData){
		let _chkSyntaxErrDapi2 = CharPairChecker(onlyAnimRawData, "[]")
		if(!_chkSyntaxErrDapi2.status){	
			dispatch({
			type:ActionType.SHOWHIDE_ALERT,
			payload: _chkSyntaxErrDapi2.message
			}) 
		}
	}
    //> End of Using DapiInspector.js.

	}

	return (
		<Grid container alignItems="center" justifyContent="center" spacing={2} style={{marginTop:'5px'}}>
			{
				arrBtns.map((obj)=>{
					return (
						<Grid item key={obj.id}>
							<Button variant="contained" color="primary" 
								onClick={()=>DownloadFile(props.isMobile, props.components, props.items, props.designerApi, fileDownloaded)}>
								Download
							</Button>
						</Grid>
					)
				})
			}
			<div className={classes.btn}>
				<input className={classes.btnUpload} id="my_files" type="file" onChange={()=>{

            
                const uploadResult =  UploadFile(props.clearArray, fileUploaded)


				  
			
			}}/>
				UPLOAD
			</div>
		</Grid>
	)
}

const matStateToProps = state => {
	return {
		items:state.items,
		isMobile:state.isMobile,
		components:state.components,
		codeGenerated:state.codeGenerated,
		designerApi:state.designerApi
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fileUploaded:(data, isMobile, dapi, arr)=>{
			dispatch({type:ActionType.FILE_UPLOADED, payload:{value:data, dapi:dapi, arr:arr}});

			setTimeout(function(){
				dispatch({type:ActionType.PLATFORM_CHANGED, payload:{platform:isMobile}})
			},100);
		},

		clearArray:()=>{
			dispatch({type:ActionType.CLEAR_ARRAY, payload:{}})
		}
	}
}

export default connect(matStateToProps, mapDispatchToProps) (BtnHolder);