// import React from 'react';
// import axios from 'axios';
// import { useState } from 'react';
// const Dev = () => {
//     let [image, setImage] = useState()
//     const [data, setData] = useState(null)
//     const dev = async (data) => {
//         console.log(data.split(';'));
//         let payload = {
//             image: data.split(';')[1],
//             mime: data.split(';')[0].split(':')[1]
//         }
//         const res = await axios.post('https://9611yuskqf.execute-api.ap-northeast-1.amazonaws.com/development/image-upload', payload, {
//             headers: {
//                 Authorization: 'Bearer ' + 'ezyskd'
//             }
//         });
//         setData(res.data)
//     }
//     const encode = (file, cb) => {
//         let reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = function () {
//             // cb(reader.result)
//             console.log(reader.result.split(',')[1]);
//             connect(reader.result.split(',')[1])
//         };
//         reader.onerror = function (error) {
//             console.log('Error: ', error);
//         };
//     }

//     const connect = async (data) => {
//         try {
//             const res = await axios.post('http://localhost:3000/srs', { stream: data })
//             console.log('====================================');
//             console.log(res.data);
//             console.log('====================================');
//         } catch (error) {

//         }
//     }

//     function formatBytes(size, decimals = 2) {
//         if (size === 0) return '0 bytes';
//         const k = 1024;
//         const dm = decimals < 0 ? 0 : decimals;
//         const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
//         const i = Math.floor(Math.log(size) / Math.log(k));
//         return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
//     }
//     return (
//         <div>
//             <input type="file" name="image" id="" onChange={(e) => setImage(e.target.files[0])} />
//             <button onClick={() => encode(image, dev)}>upload</button>

//             <div>
//                 {
//                     data ? <img src={data.imageURL} /> : ''
//                 }
//                 <a href={data?.imageURL} download>download</a>
//             </div>
//         </div>
//     );
// }

// export default Dev;

import axios from 'axios';
import React, { useState } from 'react';

const Dev = () => {
    const [file, setFile] = useState(null);
    const [uploadUrl, setUploadUrl] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUploadClick = () => {
        console.log(file.type);
        axios.post('https://yya57l3ej9.execute-api.ap-northeast-1.amazonaws.com/srs', {}, {
            params: {
                filename: file.name,
                contentType: file.type
            },

        })
            .then(response => {
                console.log('====================================');
                console.log(response.data.uploadUrl);
                console.log('====================================');
                setUploadUrl(response.data.uploadUrl);
            });

    };

    const handleUploadSubmit = (event) => {
        event.preventDefault();

        axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': file.type,
                'x-amz-acl': 'public-read'

            }
        })
            .then(response => {
                console.log('File uploaded successfully!');
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUploadClick}>Get Upload URL</button>
            {uploadUrl && (
                <form onSubmit={handleUploadSubmit}>
                    <input type="submit" value="Upload File" />
                </form>
            )}
        </div>
    );
};

export default Dev;
