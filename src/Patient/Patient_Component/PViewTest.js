

import React from 'react';
import { useParams } from 'react-router-dom';
import ViewTest from '../../Admin/ViewTest';

function PViewTest() {
  const { idArray } = useParams();
  console.log("array in PViewTest.js " +idArray);

  return (
    <div>
      <ViewTest idArray ={idArray}/>
    </div>
  );
}

export default PViewTest;


