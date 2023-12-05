import React from "react";

const CopyWrite = () => {
  return (
    <div className="copy-write-contaier">
      <span>© 2023, JIC IT Solutions Pvt Ltd. All Rights Reserved.</span>
      <br />
      <span>
        {` By using this website, you accept our `}
        <span className="term-condition">Terms of Use </span>
        and
        <span className="term-condition"> Privacy Policy.</span>
      </span>
    </div>
  );
};

export default CopyWrite;
