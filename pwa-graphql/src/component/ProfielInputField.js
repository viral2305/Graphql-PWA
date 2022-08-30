import React, {useState} from "react";

export default function InputField({inputLabel, inputType,fieldName,openEdit,closeInput,open,inputKey,value,valueChange}) {
  const [changeValue, setChangeValue] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fieldValue, setFieldValue] = useState({});


  const handleOpenEdit = (inputKey) => {
    openEdit(inputKey)
  }
  const handleCloseInput = () => {
    setChangeValue('')
    closeInput()
  }
  const handleInputChange = (e) => {
    setChangeValue(e.target.value)
    setFieldValue({[e.target.name]: e.target.value})
  }

  const saveBtn = () => {
    valueChange(fieldValue)
  }
  const PasswordIndicator = () => setPasswordVisible(!passwordVisible)

  return (
    <details className=' bg-green-200 p-2 rounded-lg m-6' open={open}
             onClick={(e) => e.preventDefault()}>
      <summary className='flex justify-between item-center '>
        <p className='text-2xl font-semibold text-green-800 capitalize'>{fieldName}:<span className='ml-4 text-green-600 text-xl '>{changeValue == '' ? value : changeValue}</span></p>
        <svg className="h-7 w-7 fill-green-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
             onClick={() => handleOpenEdit(inputKey)}>
          <path
            d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/>
        </svg>
      </summary>
      <div className='flex mt-4 h-10 justify-between'>
        <div className='flex items-center border-1 py-2 px-3 rounded-lg bg-white w-1/2'>
          <input className="bg-transparent outline-none pl-2 w-full mr-2.5 rounded border-none" type={inputType != 'password' ? inputType : (passwordVisible ? 'text': 'password')} name={fieldName} id="first-name"
                 placeholder={inputLabel} onChange={handleInputChange}/>
          {inputType == 'password' &&
          <div>
            {!passwordVisible ? <svg className="h-5 w-5 fill-gray-400" onClick={PasswordIndicator}
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path
                  d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"/>
              </svg>
              : <svg className="h-5 w-5 fill-gray-400" onClick={PasswordIndicator} xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 640 512">
                <path
                  d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z"/>
              </svg>
            }
          </div>
          }
        </div>
        <div className='flex'>
          <button type="button" onClick={handleCloseInput}
                  className="block px-8 rounded bg-green-600  hover:bg-green-800 text-white font-semibold ">Cancel
          </button>
          <button type="button" onClick={() => saveBtn()}
                  className="block ml-2.5 px-8 rounded  bg-green-600  hover:bg-green-800 text-white font-semibold ">Save
          </button>
        </div>
      </div>
    </details>
  )
}