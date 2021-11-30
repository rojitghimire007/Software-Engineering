
const links = [
    {
        main: '01. Menu',
        default: '/',
        subItems: [
            {
                main: '- Menu Files',
                default: '/dashboard/menu'
            }],
    },


    {
        main: '02. Construction Committee',
        subItems: [
            {
                main: '- Why is a Pipeline Needed',
                default: '/'
            },
            {
                main: '- Needs Analysis and Project Justification',
                default: '/dashboard/needsAnalysis'
            },
            {
                main: '- Project Authorization and Certification',
                default: '/dashboard/projectAuthorization'
            },
            {
                main: '- Overview of Construction',
                default: '/dashboard/overviewOfConstruction'
            },
            {
                main: '- Special Construction Technique',
                default: '/dashboard/specialConstructionTechnique'
            },
            {
                main: '- Post-Construction Maintenance',
                default: '/'
            },
            {
                main: '- Summary',
                default: '/'
            },
            {
                main: '- Standard Construction Drawings',
                default: '/'
            },
            {
                main: '- Guidelines for Parallel Construction',
                default: '/dashboard/guidelines'
            },
            {
                main: '- Construction Bid Documents',
                default: '/'
            },
            {
                main: '- Construction Standers',
                default: '/dashboard/constructionStanders'
            },
            {
                main: '- Schedules',
                default: '/'
            },
            {
                main: '- Meeting Minutes',
                default: '/'
            },
            {
                main: '- Contact Phone Numbers',
                default: '/'
            },
        ],
        default: '',
    },


    {
        main: '03. Construction Team',
        subItems: [
            {
                main: '- Construction Team',
                default: '/dashboard/constructionTeam'
            },
            {
                main: '- Contractor Mobilizes',
                default: '/'
            },
            {
                main: '- Permits',
                default: '/dashboard/permits'
            },
            {
                main: '- Environmental',
                default: '/dashboard/environmental'
            },
            {
                main: '- Clearing',
                default: '/dashboard/clearing'
            },
            {
                main: '- Grading',
                default: '/dashboard/grading'
            },
            {
                main: '- Access Roads to Right of Way',
                default: '/'
            },
            {
                main: '- Material Inventory',
                default: '/dashboard/inventory/materialInventory'
            },
            {
                main: '- GPS Survey',
                default: '/dashboard/gpsSurvey'
            },
            {
                main: '- Stringing',
                default: '/dashboard/stringing'
            },
            {
                main: '- Trenching',
                default: '/dashboard/trenching'
            },
            {
                main: '- HDD',
                default: '/dashboard/hdd'
            },
            {
                main: '- Pipe Bending',
                default: '/dashboard/bending'
            },
            {
                main: '- Welding',
                default: '/dashboard/welding'
            },
            {
                main: '- X-Ray',
                default: '/dashboard/xray'
            },
            {
                main: '- Blasting',
                default: '/dashboard/blasting'
            },
            {
                main: '- Coating',
                default: '/dashboard/coating'
            },
            {
                main: '- Rock Shield',
                default: '/'
            },
            {
                main: '- Padding',
                default: '/dashboard/padding'
            },
            {
                main: '- Trench Plugs',
                default: '/'
            },
            {
                main: '- Lowering In',
                default: '/dashboard/lowering'
            },
            {
                main: '- Weights',
                default: '/'
            },
            {
                main: '- Flowable Fill',
                default: '/'
            },
            {
                main: '- Backfill',
                default: '/'
            },
            {
                main: '- Pipe Removed',
                default: '/'
            },
            {
                main: '- Abandonment Pipe',
                default: '/'
            },
            {
                main: '- Hydrostatic Testing',
                default: '/dashboard/hydrostaticTesting'
            },
            {
                main: '- Valve Site',
                default: '/'
            },
            {
                main: '- Restoration',
                default: '/dashboard/restoration'
            },
            {
                main: '- Utility Pigs',
                default: '/dashboard/pigs'
            },
            {
                main: '- Inline Inspection Tools',
                default: '/'
            },
            {
                main: '- Inspector Reports',
                default: '/dashboard/inspectorReports'
            },
            {
                main: '- Safety',
                default: '/dashboard/safety'
            },
            {
                main: '- Road Repair',
                default: '/'
            },
            {
                main: '- Local Mapping',
                default: 'https://docs.google.com/document/d/1SVJcIpygNHZpzUz6fKJYYB7wdePlm74J/edit?usp=drive_web&ouid=102872920544363015107&rtpof=true'
            },
            {
                main: '- Weather Tracking',
                default: '/dashboard/weatherTracking'
            },
            {
                main: '- Progress Reports',
                default: '/'
            },
        ],
        default: '',
    },


    {
        main: '04. Completion Reports',
        subItems: [
            {
                main: '- Closing',
                default: '/'
            },
            {
                main: '- Ensure Deliverables Meets Project Specifications',
                default: '/'
            },
            {
                main: '- Recieve Customer Approval',
                default: '/'
            },
            {
                main: '- Archive Documents Books',
                default: '/'
            },
            {
                main: '- Complete Lessons Learned',
                default: '/'
            },
        ],
        default: '',
    },
    {
        main: '05. Honor Guard Inspection',
        subItems: [
            {
                main: '- Add Items Here',
                default: '/'
            },
        ],
        default: '',
    },
    {
        main: '06. Contractors Tool Box',
        subItems: [
            {
                main: '- Reference Boxes',
                default: '/'
            },
            {
                main: '- Calculator',
                default: '/'
            },
            {
                main: '- Welding',
                default: '/'
            },
            {
                main: '- Pipe and Steel Dimensions',
                default: '/dashboard/pipeAndSteelDimensions'
            },
            {
                main: '- Fabrication',
                default: '/'
            },
            {
                main: '- Rigging',
                default: '/'
            },
            {
                main: '- Codes',
                default: '/'
            },
            {
                main: '- Measurments',
                default: '/'
            },
        ],
        default: '',
    },
];

const FileStructure = () => {
    return links;
}
export default FileStructure;