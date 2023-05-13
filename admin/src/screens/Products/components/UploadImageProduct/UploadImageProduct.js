import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { convertFileToBase64 } from '../../../../utils/convertBase64';
export const UploadImageProduct = (props) => {
  const { setImages, name, clear } = props;
  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);

  useEffect(() => {
    fileUploadRef.current.clear();
  }, [clear]);

  const onTemplateSelect = (e) => {
    let _totalSize = e.files[0].size;
    setImages((pre) => [...pre, ...e.files]);
    setTotalSize(_totalSize);
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);

    setImages((pre) => pre.filter((item) => item.name !== file.name));
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
    setImages([]);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

    return (
      <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
        {chooseButton}
        {cancelButton}
        <ProgressBar
          value={value}
          displayValueTemplate={() => `${formatedValue} / 1 MB`}
          // style={{ width: '300px', height: '20px', marginLeft: 'auto' }}
        ></ProgressBar>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap  " style={{ display: 'flex', height: '150px' }}>
        <div className="flex align-items-center  d-flex " style={{ width: '90%', display: 'flex' }}>
          <img alt={file.name} role="presentation" src={file.objectURL} height={150} />
          <span
            className="flex  text-left justify-content-start"
            style={{
              fontSize: '1.6rem',
              paddingLeft: '2rem',
              maxWidth: '80%',
              minWidth: '80%',
              textAlign: 'start',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              // height: '110px',
              whiteSpace: 'nowrap',
            }}
          >
            {`Image of ${name || 'product'}`}
          </span>
          <small style={{ paddingLeft: '5px' }}>{new Date().toLocaleDateString()}</small>
        </div>
        {/* <Tag value={props.formatSize} severity="warning" className="px-3 py-2" /> */}
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
      <div className="flex align-items-center flex-column" style={{ display: 'flex' }}>
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)',
          }}
        ></i>
        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
          Kéo và thả hình tại đây
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined',
  };
  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
  };
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  };

  return (
    <div>
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />

      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <div className="col-12">
        <Accordion>
          <AccordionSummary
            sx={{ alignItems: 'center' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }} noWrap variant="body1" color="black">
              <UploadFileIcon sx={{ fontSize: 20 }} color="action" />
              <Typography sx={{ ml: 1 }}>Thêm ảnh</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <FileUpload
              multiple
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
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
