import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface LabTabsProps {
    tabs: { label: string }[];
    tabPanels: { content: React.ReactNode }[];
}

const LabTabs: React.FC<LabTabsProps> = ({ tabs, tabPanels }) => {
        
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {tabs?.map((tab, i) => (
                        <Tab key={i} label={tab.label} {...a11yProps(i)} />
                    ))}
                </Tabs>
            </Box>
            {tabPanels?.map((tabPanel, i) => (
                <CustomTabPanel key={i} value={value} index={i}>
                    {tabPanel.content}
                </CustomTabPanel>
            ))}
        </Box>
    );
};

export default LabTabs;
