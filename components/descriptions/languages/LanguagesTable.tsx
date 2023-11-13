import {Table} from '@nextui-org/react';
import React, {useEffect, useState} from 'react';
import {Box} from '../../styles/box';
import {RenderCell} from './render-cell';
import api from '../../../app/api';

export const LanguagesTable = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [columns, setColumns] = useState([
        {name: 'CODE', uid: 'code'},
        {name: 'NAME', uid: 'name'},
        {name: 'ACTIONS', uid: 'actions'},
    ]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [languages, setLanguages] = useState([]);

    const updateTable = () => {
      api.get('/v1/language')
        .then(languagesResponse => {
          console.log(languagesResponse.status);
          setLanguages(languagesResponse.data);
        })
        .catch(error => {
          console.log(error);
        })
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            updateTable();
        }
    }, []);
    if (languages.length > 0) {
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
                    <Table.Body items={languages}>
                        {(item: any) => (
                            <Table.Row key={item.languageCode}>
                                {(columnKey) => (
                                    <Table.Cell>
                                        {RenderCell({language: item, columnKey: columnKey})}
                                    </Table.Cell>
                                )}
                            </Table.Row>
                        )}
                    </Table.Body>
                    <Table.Pagination
                        shadow
                        noMargin
                        align="center"
                        rowsPerPage={15}
                        onPageChange={(page) => console.log({page})}
                    />
                </Table>
            </Box>
        );
    } else {
        return(
            <></>
        )
    }
};
