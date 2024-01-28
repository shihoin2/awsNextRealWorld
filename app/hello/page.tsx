// test用
// "use client"
// import React, { useState, useEffect } from 'react';
// import { NextRequest, NextResponse } from "next/server";

// const Hello = () => {
//   const [helloAPI, setHelloAPI] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/hello');
//         if (!response.ok) {
//           throw new Error('Error!')
//         }
//         // const data = await response.json();
//         const data = await response.text();
//         setHelloAPI(data);
//       } catch (error) {
//         console.error('data catch error', error);
//       }

//     };
//     fetchData();
//   }, []);
//   return (
//     <div>
//       {helloAPI ? (
//         // <p>Laravelからのレスポンス: {JSON.stringify(helloAPI)}</p>
//         <p>Laravelからのレスポンス: {helloAPI}</p>
//       ) : (
//         <p>読み込み中...</p>
//       )}
//     </div>
//   );
// }

// export default Hello;
