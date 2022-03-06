import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {text} from "stream/consumers";
import {MediaApi} from "../../Api/MediaApi";
import Video from "./Video";


interface IFileInputProps {

}

type fileType = {
    lastModified: number
    name: string
    size: number
    type: string
    webkitRelativePath: string
}

const MediaPage: React.FC<IFileInputProps> = () => {
    const inRef = useRef<HTMLInputElement>(null);
    const [base64, setBase64] = useState(true); // base64 - true, text - false
    const [file, setFile] = useState<fileType>({lastModified: 0, name: '', size: 0, type: '', webkitRelativePath: ''});
    const [fileURL, setFileURL] = useState<string>();
    const [file64, setFile64] = useState<any>();
    const [fileData, setFileData] = useState<any>();
    const [code, setCode] = useState(false);
    const [text, setText] = useState('');


    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        let formData = new FormData(); // for send to back

        const newFile = e.target.files && e.target.files[0]; //даже если одну картинку выбрали, то придет массивом, выбрали первую ячейку массива
        if (newFile) {
            setFile(newFile); // сохраняю картинку в юзСтейт
            setFileURL(window.URL.createObjectURL(newFile)); // внутренняя ссылка -нужна чтобы отобразить на странице

            formData.append('myFile', newFile, newFile.name);
            setFileData(formData);

            // if (code) { // reader
            reader.onloadend = () => {
                setFile64(reader.result);
            };
            if (base64) reader.readAsDataURL(newFile);
            else reader.readAsText(newFile);
            // }
        }
    };

    const returnFileSize = (n: number) => {
        if (n < 1024) {
            return n + 'bytes';
        } else if (n > 1024 && n < 1048576) {
            return (n / 1024).toFixed(2) + 'KB';
        } else if (n > 1048576) {
            return (n / 1048576).toFixed(2) + 'MB';
        }
    };


//чтобы записать картинку на комп в папку загрузки
    const writeFile = (fileName: string, value: string) => {
        const link = document.createElement("a");
        link.href = "data:text/plain;content-disposition=attachment;filename=file," + value;
        link.download = fileName;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    //отправить картинку на сервер
    const send = () => {
        MediaApi.sendFile(fileData)
            .then((res) => {
                console.log(res.data)
            })
    };

    // запросить файл
    const getFile = (fileName: string) => {
        MediaApi.getFile()
            .then(({data}) => {
                const blob = new Blob([data], {type: 'image/jpeg'});
                console.log(blob)
                // создать ссылку на файл
                const downloadUrl = window.URL.createObjectURL(blob);
                // создать тег "ссылка" на наш файл
                const link = document.createElement('a');
                link.href = downloadUrl;
                // добавить атрибуты нашему тегу: загрузочный, имя файла
                link.setAttribute('download', fileName);
                // добавить тег в документ
                document.body.appendChild(link);
                // нажать на ссылку
                link.click();
                // удалить тег из документа
                link.remove();
            })
    };


    return (
        <div>
            {/*<input type="file" accept=".jpg, .jpeg, .png" multiple/> -типичный инпут, ниже мы его переделали в кнопку*/}

            <img src={file64} alt={'file'} width={'100px'}/>
            <div>name: {file && file.name}</div>
            <div>lastModified: {file && file.lastModified}</div>
            <div>size: {file && returnFileSize(file.size)}</div>
            <div>type: {file && file.type}</div>

            <input
                ref={inRef}
                type={'file'}
                style={{display: 'none'}}
                onChange={upload}
            />
            {/*по онклику появится ref*/}
            <button onClick={() => inRef && inRef.current && inRef.current.click()}>add</button>

            <div>
                {/*чтобы записать текст на комп в папку загрузки*/}
                <button onClick={() => writeFile('Text.txt', text + `\r\n` + file64)}>save</button>
                <button onClick={send}>send</button>
                <button onClick={() => getFile('newFile.jpg')}>get</button>
            </div>

            {/*видео плеер*/}
            <Video fileURL={fileURL}/>

        </div>
    );
};

export default MediaPage;


//---------------------------------------------------------------------------------
// import React, {ChangeEvent, useRef, useState} from 'react';
// import {baseURL, instance} from "../../../../../base-url";
// import Video from "./Video";
// import {FlexColumnCenterCenter} from "../../../../../neko-3-styles/flex-containers";
// import {getFile, writeFile} from "./getFile";
//
// interface IFileInputProps {
//
// }
//
// const FileInput: React.FC<IFileInputProps> = () => {
//     const inRef = useRef<HTMLInputElement>(null);
//
//     const [code, setCode] = useState(false);
//     const [base64, setBase64] = useState(true); // base64 - true, text - false
//     const [text, setText] = useState('');
//     const [file, setFile] = useState();
//     const [fileURL, setFileURL] = useState();
//     const [file64, setFile64] = useState();
//     const [fileData, setFileData] = useState();
//
//     const upload = (e: ChangeEvent<HTMLInputElement>) => {
//         // e.preventDefault();
//         const reader = new FileReader();
//         const formData = new FormData(); // for send to back
//
//         const newFile = e.target.files && e.target.files[0];
//
//         if (newFile) {
//             setFile(newFile);
//             setFileURL(window.URL.createObjectURL(newFile));
//             formData.append('myFile', newFile, newFile.name);
//             setFileData(formData);
//
//             if (code) { // reader
//                 reader.onloadend = () => {
//                     setFile64(reader.result);
//                 };
//
//                 if (base64) reader.readAsDataURL(newFile);
//                 else reader.readAsText(newFile);
//             }
//         }
//     };
//
//     const send = () => {
//         const response = instance.post('/file', fileData);
//     };
//
//     const returnFileSize = (n: number) => {
//         if (n < 1024) {
//             return n + 'bytes';
//         } else if (n > 1024 && n < 1048576) {
//             return (n / 1024).toFixed(2) + 'KB';
//         } else if (n > 1048576) {
//             return (n / 1048576).toFixed(2) + 'MB';
//         }
//     };
//
//     return (
//         <div style={FlexColumnCenterCenter}>
//             FileInput
//
//             <input type="file" accept=".jpg, .jpeg, .png" multiple/>
//             <hr style={{width: '100%'}}/>
//
//             <label>
//                 reader
//                 <input type={'checkbox'} checked={code} onChange={e => setCode(e.currentTarget.checked)}/>
//             </label>
//             <label>
//                 base64
//                 <input type={'checkbox'} checked={base64} onChange={e => setBase64(e.currentTarget.checked)}/>
//             </label>
//
//             <img src={file64} alt={'file'} width={'300px'}/>
//             <div>name: {file && file.name}</div>
//             <div>lastModified: {file && file.lastModified}</div>
//             <div>size: {file && returnFileSize(file.size)}</div>
//             <div>type: {file && file.type}</div>
//
//             <input
//                 ref={inRef}
//                 type={'file'}
//                 style={{display: 'none'}}
//                 onChange={upload}
//             />
//             <button onClick={() => inRef && inRef.current && inRef.current.click()}>add</button>
//             <hr style={{width: '100%'}}/>
//
//             <textarea value={text} onChange={e => setText(e.currentTarget.value)}/>
//             <pre>{file64}</pre>
//             <div>
//                 <button onClick={() => writeFile('Text.txt', text + `\r\n` + file64)}>save</button>
//                 <button onClick={send}>send</button>
//                 <button onClick={() => getFile(baseURL + 'file', 'newFile.jpg')}>get</button>
//             </div>
//
//             <hr style={{width: '100%'}}/>
//
//             <Video fileURL={fileURL}/>
//         </div>
//     );
// };
//
// export default FileInput;

