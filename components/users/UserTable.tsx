import {Table} from '@nextui-org/react';
import React, {useEffect, useState} from 'react';
import {Box} from '../styles/box';
import {RenderCell} from './render-cell';
import api from '../../app/api';

export const UserTable = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [columns, setColumns] = useState([
        {name: 'NAME', uid: 'name'},
        {name: 'GROUP', uid: 'group'},
        {name: 'ACTIONS', uid: 'actions'},
    ]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                console.log(token);
                api.get('/v1/account/user/list', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(usersResponse => {
                    console.log(usersResponse.status);
                    setUsers(usersResponse.data);
                    console.log(usersResponse);
                })
                .catch(error => {
                    console.log(error);
                })
            }
        }
    }, []);

    if (users.length > 0) {
        return (
            <Box
                css={{
                    '& .nextui-table-container': {
                        boxShadow: 'none',
                    },
                }}
            >
                <Table
                    aria-label="The user table"
                    css={{
                        height: 'auto',
                        minWidth: '100%',
                        boxShadow: 'none',
                        width: '100%',
                        px: 0,
                    }}
                    selectionMode="multiple"
                >
                    <Table.Header columns={columns}>
                        {(column) => (
                            <Table.Column
                                key={column.uid}
                                hideHeader={column.uid === 'actions'}
                                align={column.uid === 'actions' ? 'center' : 'start'}
                            >
                                {column.name}
                            </Table.Column>
                        )}
                    </Table.Header>
                    <Table.Body items={users}>
                        {(item) => (
                            <Table.Row>
                                {(columnKey) => (
                                    <Table.Cell>
                                        {RenderCell({user: item, columnKey: columnKey})}
                                    </Table.Cell>
                                )}
                            </Table.Row>
                        )}
                    </Table.Body>
                    <Table.Pagination
                        shadow
                        noMargin
                        align="center"
                        rowsPerPage={10}
                        onPageChange={(page) => console.log({page})}
                    />
                </Table>
            </Box>
        );
    }
};
