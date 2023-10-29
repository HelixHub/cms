import {Button, Divider, Input, Modal, Text} from '@nextui-org/react';
import React, {useEffect} from 'react';
import {Flex} from '../styles/flex';
import api from "../../app/api";
import Select from "react-select";

export const AddUser = () => {
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
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [group, setGroup] = React.useState({ value: 2, label: "Default"});
    const [groups, setGroups] = React.useState([]);
    const [selectGroups, setSelectGroups] = React.useState([]);


    const handler = () => setVisible(true);

    const closeHandler = () => {
      setVisible(false);
      console.log('closed');
    };

    const handleSubmit = async () => {
        try {
            const body = {
                name: name,
                email: email,
                password: password,
                group: group.value
            };
            const response = await api.post("/v1/account/user", body);
            if (response.status === 201) {
                closeHandler();
            } else {
                console.log(response.status, response.statusText);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                console.log(token);
                api.get('/v1/account/group/list', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(groupResponse => {
                        console.log(groupResponse.status);
                        setGroups(groupResponse.data);
                        setSelectGroups(
                            groupResponse.data.map((group: { id: number; name: string; }) => ({
                                value: group.id,
                                label: group.name
                            }))
                        );
                        console.log(groupResponse);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }, []);


    return (
      <div>
         <Button auto onClick={handler}>
            Add User
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
                  Add new user
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
                       label="Name"
                       bordered
                       clearable
                       fullWidth
                       size="lg"
                       placeholder="Name"
                       value={name}
                       onChange={(e) => { setName(e.target.value) }}
                   />
                   <Input
                       label="Email"
                       clearable
                       bordered
                       fullWidth
                       size="lg"
                       placeholder="Email"
                       value={email}
                       onChange={(e) => { setEmail(e.target.value) }}
                   />
                   <Input
                       label="Password"
                       type="password"
                       clearable
                       bordered
                       fullWidth
                       size="lg"
                       placeholder="Password"
                       value={password}
                       onChange={(e) => { setPassword(e.target.value) }}
                   />
                   <Select
                       defaultValue={group}
                       styles={customStyles}
                       isClearable={true}
                       placeholder="Group"
                       value={group}
                       options={selectGroups}
                       onChange={(e) => {
                           if (e) {
                               setGroup(e);
                           }
                       }}
                   />
               </Flex>
            </Modal.Body>
            <Divider css={{my: '$5'}} />
            <Modal.Footer>
               <Button auto onClick={handleSubmit}>
                  Add User
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
    );
};
