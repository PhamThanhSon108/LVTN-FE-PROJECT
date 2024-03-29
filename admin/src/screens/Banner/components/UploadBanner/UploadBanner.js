import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';

import { Button } from 'primereact/button';

export const UploadBanner = (props) => {
  const { setImage } = props;
  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);

  const onTemplateSelect = (e) => {
    let _totalSize = e.files[0].size;
    setImage(e.files[0]);
    setTotalSize(_totalSize);
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);

    setImage('');
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
    setImage('');
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, cancelButton } = options;
    return (
      <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
        {chooseButton}
        {cancelButton}

        <div style={{ width: '300px', height: '20px', marginLeft: 'auto' }}></div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap  " style={{ display: 'flex', height: '100px' }}>
        <div className="flex align-items-center  d-flex " style={{ width: '90%', display: 'flex' }}>
          <img alt={file.name} role="presentation" src={file.objectURL} height={80} />
        </div>

        <div style={{ width: '10%' }}>
          <Button
            type="button"
            icon="pi pi-times"
            className="p-button-outlined p-button-rounded p-button-danger ml-auto"
            onClick={() => onTemplateRemove(file, props.onRemove)}
          />
        </div>
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column" style={{ display: 'flex', height: 100 }}>
        <i
          className="pi pi-image mt-1 p-3 mb-1"
          style={{
            fontSize: '2em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)',
          }}
        ></i>
        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }}>Kéo và thả hình tại đây</span>
      </div>
    );
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined',
  };

  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  };

  return (
    <div className="col-12">
      <Toast ref={toast}></Toast>

      {/* <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />

      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" /> */}

      <div className="card">
        <FileUpload
          ref={fileUploadRef}
          name="demo[]"
          url="https://primefaces.org/primereact/showcase/upload.php"
          accept="image/*"
          maxFileSize={1000000}
          // onUpload={onTemplateUpload}
          onSelect={onTemplateSelect}
          onError={onTemplateClear}
          onClear={onTemplateClear}
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          chooseOptions={chooseOptions}
          cancelOptions={cancelOptions}
        />
      </div>
    </div>
  );
};
