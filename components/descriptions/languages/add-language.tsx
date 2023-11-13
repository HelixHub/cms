import {Button, Divider, Input, Modal, Text} from '@nextui-org/react';
import React, {useEffect} from 'react';
import {Flex} from '../../styles/flex';
import api from "../../../app/api";

export const AddLanguage = () => {
    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            border: '1px solid #ccc',
            width: '100%',
            height: '48px',
            fontSize: '1.125rem',
            background: '#333'
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: 'white'
        }),
        menu: (provided: any) => ({
            ...provided,
            background: '#333',
        }),
        option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
            ...provided,
            color: state.isSelected ? 'black' : 'white',
            background: state.isFocused ? '#555' : '#444',  // Hintergrund der Optionen angepasst
            '&:hover': {
                background: '#666'  // Hintergrund der Optionen beim Überfahren mit der Maus
            }
        })
    };



    const [visible, setVisible] = React.useState(false);
    const [name, setName] = React.useState("");
    const [languageCode, setLanguageCode] = React.useState("");

    const handler = () => setVisible(true);

    const closeHandler = () => {
      setVisible(false);
      console.log('closed');
    };

    const handleSubmit = async () => {
        try {
            const body = {
                name: name,
                languageCode: languageCode,
            };
            const response = await api.post("/v1/language", body, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (response.status === 201) {
                closeHandler();
                window.location.reload();
            } else {
                console.log(response.status, response.statusText);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
      <div>
         <Button auto onClick={handler}>
            Add Language
         </Button>
         <Modal
            closeButton
            aria-labelledby="modal-title"
            width="600px"
            open={visible}
            onClose={closeHandler}
         >
            <Modal.Header css={{justifyContent: 'start'}}>
               <Text id="modal-title" h4>
                  Add new language
               </Text>
            </Modal.Header>
            <Divider css={{my: '$5'}} />
            <Modal.Body css={{py: '$10'}}>
               <Flex
                  direction={'column'}
                  css={{
                     'flexWrap': 'wrap',
                     'gap': '$8',
                     '@lg': {flexWrap: 'nowrap', gap: '$12'},
                  }}
               >
                   <Input
                       label="Language Code"
                       clearable
                       bordered
                       fullWidth
                       size="lg"
                       placeholder="Language Code"
                       value={languageCode}
                       onChange={(e) => { setLanguageCode(e.target.value) }}
                   />
                   <Input
                       label="Name"
                       bordered
                       clearable
                       fullWidth
                       size="lg"
                       placeholder="Name"
                       value={name}
                       onChange={(e) => { setName(e.target.value) }}
                   />
               </Flex>
            </Modal.Body>
            <Divider css={{my: '$5'}} />
            <Modal.Footer>
               <Button auto onClick={handleSubmit}>
                  Add Language
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
    );
};
