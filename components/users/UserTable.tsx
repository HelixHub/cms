import {Table, useClickAway} from '@nextui-org/react';
import React, {useEffect, useState} from 'react';
import {Box} from '../styles/box';
import {RenderCell} from './render-cell';
import {UserApi} from '../../generated-client/api';


export const UserTable = () => {
    const userApi = new UserApi();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [columns, setColumns] = useState([
        {name: 'NAME', uid: 'name'},
        {name: 'GROUP', uid: 'group'},
        {name: 'EMAIL', uid: 'email'},
        {name: 'ACTIONS', uid: 'actions'},
    ]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                userApi.userControllerGetUsers({
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(usersResponse => {
                    if (usersResponse.status === 200) {
                        setUsers(usersResponse.data);
                    }
                })
            }
        }
    }, []);

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
                    rowsPerPage={8}
                    onPageChange={(page) => console.log({page})}
                />
            </Table>
        </Box>
    );
};
