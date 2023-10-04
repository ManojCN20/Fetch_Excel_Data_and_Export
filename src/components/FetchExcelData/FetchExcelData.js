import React, { useRef, useState } from 'react'
import { Container } from 'react-bootstrap';
import *as xlsx from 'xlsx';
import { useDownloadExcel } from 'react-export-table-to-excel';

const FetchExcelData = () => {



  const [excelData, setExcelData] = useState([]);

  const readExcel = async(e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer(file);
    const excelFile = xlsx.read(data);
    const excelSheet = excelFile.Sheets[excelFile.SheetNames[0]];
    const excelJson= xlsx.utils.sheet_to_json(excelSheet)
    // console.log(excelJson);
    setExcelData(excelJson);
  }


  const tableRef = useRef(null);


  const{ onDownload } = useDownloadExcel({
    currentTableRef:tableRef.current,
    filename: "Leads",
    sheet: 'Leads Data'
  })




  return (
    <>
    <Container className='content'>
      <div className='row fthight'>
        <div className='col-md-4'>
          <h3 className='mt-3'>Fetch Excel Data</h3>
          <label htmlFor="xdata" className='form-label'>File</label>
          <input type="file" className='form-control' name="ExcelFile" id="xdata" onChange={(e) => readExcel(e)}/>
        </div>
        <div className='col-md-12 mt-3'>
          <table className='table' ref={tableRef}>
            <thead>
              <tr>
                <th>Sl.No.</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Timezone</th>
              </tr>
            </thead>
            <tbody>
              {excelData.map((getData, index) => (
                <tr key={index}>
                <td>{index+1}</td>
                <td>{getData.Name}</td>
                <td>{getData.Phone}</td>
                <td>{getData.Email}</td>
                <td>{getData.Timezone}</td>
              </tr>
              ))}
            </tbody>
          </table>
          <button onClick={onDownload}>Export Data</button>
          
        </div>
      </div>
    </Container>
    </>
  )
}

export default FetchExcelData;