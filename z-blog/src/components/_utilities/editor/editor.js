import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import Button from '@mui/material/Button'; // MUI Button

// Custom toolbar component where we add the "Send" button
const CustomToolbar = () => (
 <div id="toolbar" style={{width:'auto'}}>
    <select className="ql-header">
      <option value="1"></option>
      <option value="2"></option>
      <option value=""></option>
    </select>
    <select className="ql-size">
      <option value="small"></option>
      <option value="normal"></option>
      <option value="large"></option>
      <option value="huge"></option>
    </select>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-align" value=""></button>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
    <button className="ql-code"></button>
    <button className="ql-clean"></button>
    </div>

);

// Editor component
export default function Editor({content,setcontent,agreefunc,disagreefunc}) {
  

  const handleChange = (value) => {
    setcontent(value);
  };

  return (
    <>
      <div className="editorContainer">
        {/* Render custom toolbar */}
        <div className='d-flex justify-content-between align-items-center p-2 px-4'>
            <CustomToolbar />
            <div>
            <Button size="small" onClick={disagreefunc} variant="outlined" color="error" style={{ marginLeft: '10px' }}>Discard</Button>
            <Button size="small" onClick={agreefunc}  variant="contained" color="primary" style={{ marginLeft: '10px' }}>Send</Button>
            </div>
        </div>
        {/* Quill editor with custom toolbar */}
        <ReactQuill 
          value={content} 
          onChange={handleChange} 
          theme="snow" 
          modules={{ toolbar: { container: "#toolbar" } }} 
          formats={formats} 
          style={{ height: '90vh' }} 
        />
      </div>
    </>
  );
}

// Formats for the editor
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline',
  'list', 'bullet', 'indent',
  'link', 'image', 'align',
  'code'
];
