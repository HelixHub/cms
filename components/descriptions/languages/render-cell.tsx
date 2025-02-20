import {Col, Row, Text, Tooltip} from '@nextui-org/react';
import React from 'react';
import {DeleteIcon} from '../../icons/table/delete-icon';
import {EditIcon} from '../../icons/table/edit-icon';
import {IconButton} from '../../table/table.styled';
import api from "../../../app/api";

interface Props {
   language: any;
   columnKey: string | React.Key;
}

export const RenderCell = ({language, columnKey}: Props) => {
   const deleteLanguage = (languageCode: string) => {
      const token = localStorage.getItem('token');
      if (token) {
         api.delete('/v1/language/' + languageCode, {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })
           .then(languagesResponse => {
              console.log(languagesResponse.status);
              window.location.reload();
           })
           .catch(error => {
              console.log(error);
           })
      }
   };

   // @ts-ignore
   switch (columnKey) {
      case 'code':
         return (
             <Col>
                <Row>
                   <Text b size={14}>
                      {language.languageCode}
                   </Text>
                </Row>
             </Col>
         );
      case 'name':
         return (
            <Col>
               <Row>
                  <Text b size={14} css={{tt: 'capitalize'}}>
                     {language.name}
                  </Text>
               </Row>
            </Col>
         );

      case 'actions':
         return (
            <Row
               justify="center"
               align="center"
               css={{'gap': '$8', '@md': {gap: 0}}}
            >
               <Col css={{d: 'flex'}}>
                  <Tooltip content="Edit language">
                     <IconButton
                        onClick={() => console.log('Edit language', language.languageCode)}
                     >
                        <EditIcon size={20} fill="#979797" />
                     </IconButton>
                  </Tooltip>
               </Col>
               <Col css={{d: 'flex'}}>
                  <Tooltip
                     content="Delete language"
                     color="error"
                     onClick={() => {
                        console.log('Delete language', language.languageCode);
                        deleteLanguage(language.languageCode);
                     }}
                  >
                     <IconButton>
                        <DeleteIcon size={20} fill="#FF0080" />
                     </IconButton>
                  </Tooltip>
               </Col>
            </Row>
         );
   }
};
