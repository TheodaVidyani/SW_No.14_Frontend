import React, { useEffect } from 'react';
import ViewTest from '../../Admin/ViewTest';

function PViewTest({ idArray }) {
  useEffect(() => {
    console.log(idArray);
  }, [idArray]); // Add idArray to the dependency array to log whenever it changes

  return (
    <ViewTest />
  );
}

export default PViewTest;
