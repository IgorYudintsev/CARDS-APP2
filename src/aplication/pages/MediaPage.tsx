import React, {ChangeEvent, useRef, useState} from 'react';

interface IFileInputProps {

}

type fileType={
    lastModified: number
    name: string
    size: number
    type: string
    webkitRelativePath: string
}

const MediaPage: React.FC<IFileInputProps> = () => {
    const inRef = useRef<HTMLInputElement>(null);
     const [base64, setBase64] = useState(true); // base64 - true, text - false
    const [file, setFile] = useState<fileType>({lastModified: 0,  name: '', size: 0, type: '', webkitRelativePath: ''});
    const [fileURL, setFileURL] = useState<string>();
    const [file64, setFile64] = useState<any>();
    const [fileData, setFileData] = useState<any>();


    const upload = (e: ChangeEvent<HTMLInputElement>) => {
          const reader = new FileReader();
        const formData = new FormData(); // for send to back

        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            setFile(newFile);
            setFileURL(window.URL.createObjectURL(newFile));

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

    return (
        <div >
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
           по онклику появился
            <button onClick={() => inRef && inRef.current && inRef.current.click()}>add</button>

        </div>
    );
};

export default MediaPage;

