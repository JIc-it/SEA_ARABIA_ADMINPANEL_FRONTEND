import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function TextEditor({formik,validateeditor,setValidateEditor}){
    const modules = {
        toolbar: [
        //   [{ header: [1, 2, 3, 4, 5, 6, false] }],
        //   [{ font: [] }],
        //   [{ size: [] }],
        //   [{ color: [] }],
        //   [{ background: [] }],
        //   [{ align: [] }],
          ["bold", "italic", 
        //   "underline", "strike", "blockquote"
        ],
          [
            // { script: "sub" },
            // { script: "super" },
            { list: "ordered" },
            { list: "bullet" },
            // { indent: "-1" },
            // { indent: "+1" },
          ],
        //   ["link", "image", "video"],
        //   ["clean"],
        ],
        // clipboard: {
        //   matchVisual: false,
        // },
      }; 
    
    

    return (
      <>
        <ReactQuill
        theme="snow"
        className="mt-1 p-1"
        name="description"
        // value={formik.values.description} 
        // onChange={(value) => {formik.setFieldValue('description', value);setValidateEditor("")}}
        modules={modules}
        style={{ height: "15vh" }}
      />
       {/* {validateeditor.trim()!=="" ? (
        <>
        <br></br>
        <div className="error mt-5">{validateeditor}</div>
        </>
        ) : null} */}
      </>
    )
}
