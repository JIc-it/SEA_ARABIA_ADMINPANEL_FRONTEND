import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function TextEditor({formik}){
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
        <ReactQuill
        theme="snow"
        className="mt-1 p-1"
        value={formik.values.description} 
        onChange={(value) => formik.setFieldValue('description', value)}
        modules={modules}
        style={{ height: "15vh" }}
      />
    )
}
