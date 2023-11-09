import {Input, Text} from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import {Breadcrumbs, Crumb, CrumbLink} from '../../breadcrumb/breadcrumb.styled';
import {HouseIcon} from '../../icons/breadcrumb/house-icon';
import {Flex} from '../../styles/flex';
import {AddLanguage} from './add-language';
import {LanguagesTable} from "./LanguagesTable";

export const Languages = () => {
    return (
        <Flex
            css={{
                'mt': '$5',
                'px': '$6',
                '@sm': {
                    mt: '$10',
                    px: '$16',
                },
            }}
            justify={'center'}
            direction={'column'}
        >
            <Breadcrumbs>
                <Crumb>
                    <HouseIcon />
                    <Link href={'/'}>
                        <CrumbLink href="/">Dashboard</CrumbLink>
                    </Link>
                    <Text>/</Text>
                </Crumb>

                <Crumb>
                    <CrumbLink href="/descriptions">Descriptions</CrumbLink>
                    <Text>/</Text>
                </Crumb>
                <Crumb>
                    <CrumbLink href="/descriptions">Languages</CrumbLink>
                    <Text>/</Text>
                </Crumb>
            </Breadcrumbs>

            <Text h3>All Languages</Text>
            <Flex
                css={{gap: '$8'}}
                align={'center'}
                justify={'between'}
                wrap={'wrap'}
            >
                <Flex
                    css={{
                        'gap': '$6',
                        'flexWrap': 'wrap',
                        '@sm': {flexWrap: 'nowrap'},
                    }}
                    align={'center'}
                >
                    <Input
                        css={{width: '100%', maxW: '410px'}}
                        placeholder="Search languages"
                    />
                </Flex>
                <Flex direction={'row'} css={{gap: '$6'}} wrap={'wrap'}>
                    <AddLanguage />
                </Flex>
            </Flex>

            <LanguagesTable />
        </Flex>
    );
};
