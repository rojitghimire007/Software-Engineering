import inventoryImg from 'img/MaterialInventory.png';
import stringingImg from 'img/Stringing.png';
import bendingImg from 'img/Bending.png';
import coatingImg from 'img/Coating.png';
import weldingImg from 'img/Welding.png';
import whyPipeline from 'img/whyPipeline.png';
import needsAnalysis from 'img/needsAnalysis.png';
import projectAuthorization from 'img/projectAuthorization.png';
import overviewOfConstruction from 'img/overviewOfConstruction.png';
import specialConstructionTechnique from 'img/specialConstructionTechnique.png';
import postConstructionMaintenance from 'img/postConstructionMaintenance.png';
import summary from 'img/summary.png';
import technicalBasis from 'img/technicalBasis.png';
import standardConstructionDrawings from 'img/standardConstructionDrawings.png';
import guidelines from 'img/guidelines.png';
import constructionBidDocuments from 'img/constructionBidDocuments.png';
import constructionStanders from 'img/constructionStanders.png';
import schedules from 'img/schedules.png';
import meetingMinutes from 'img/meetingMinutes.png';
import contactPhoneNumbers from 'img/contactPhoneNumbers.png';
import constructionTeam from 'img/constructionTeam.png';
import constructorMobilization from 'img/constructorMobilization.png';
import permits from 'img/permits.png';
import environmental from 'img/environmental.png';
import clearing from 'img/clearing.png';
import grading from 'img/grading.png';
import accessRoads from 'img/accessRoads.png';
import gpsSurvey from 'img/gpsSurvey.png';
import trenching from 'img/trenching.png';
import hdd from 'img/hdd.png';
import valveSites from 'img/valveSites.png';
import rockShield from 'img/rockShield.png';
import padding from 'img/padding.png';
import lowering from 'img/lowering.png';
import backfill from 'img/backfill.png';
import survey from 'img/survey.png';
import abandonment from 'img/abandonment.png';
import pigs from 'img/pigs.png';
import hydrostaticTesting from 'img/hydrostaticTesting.png';
import restoration from 'img/restoration.png';
import inspectorReports from 'img/inspectorReports.png';
import safety from 'img/safety.png';
import weatherTracking from 'img/weatherTracking.png';
import closing from 'img/closing.png';
import ensureDeliverables from 'img/ensureDeliverables.png';
import recieveCustomerApproval from 'img/recieveCustomerApproval.png';
import archiveDocuments from 'img/archiveDocuments.png';
import lessonsLearned from 'img/lessonsLearned.png';


const links = [
    {

      parent: 'WhyPipeline',
      link: '',
      id: 'Why is a Pipeline Needed',
      image: whyPipeline,

      parent2: 'NeedsAnalysis',
      link2: '/dashboard/needsAnalysis',
      id2: 'Needs Analysis and Project Justification',
      image2: needsAnalysis,

      parent3: 'ProjectAuthorization',
      link3: '/dashboard/projectAuthorization',
      id3: 'Project Authorization and Certification',
      image3: projectAuthorization,
    },

    {
      parent: 'OverviewOfConstruction',
      link: '/dashboard/overviewOfConstruction',
      id: 'Overview of Construction',
      image: overviewOfConstruction,

      parent2: 'SpecialConstructionTechnique',
      link2: '/dashboard/specialConstructionTechnique',
      id2: 'Special Construction Technique',
      image2: specialConstructionTechnique,

      parent3: 'PostConstructionMaintenance',
      link3: '',
      id3: 'Post-Construction Maintenance',
      image3: postConstructionMaintenance,
    },

    {
      parent: 'Summary',
      link: '',
      id: 'Summary',
      image: summary,

      parent2: 'TechnicalBasis',
      link2: '',
      id2: 'Technical Basis',
      image2: technicalBasis,

      parent3: 'StandardConstructionDrawings',
      link3: '',
      id3: 'Standard Construction Drawings',
      image3: standardConstructionDrawings,
    },

    {
      parent: 'GuidlinesForParallelConstruction',
      link: '/dashboard/guidelines',
      id: 'Guidlines for Parallel Construction',
      image: guidelines,

      parent2: 'ConstructionBidDocuments',
      link2: '',
      id2: 'Construction Bid Documents',
      image2: constructionBidDocuments,

      parent3: 'ConstructionStanders',
      link3: '/dashboard/constructionStanders',
      id3: 'Construction Standers',
      image3: constructionStanders,
    },

    {
      parent: 'Schedules',
      link: '',
      id: 'Schedules',
      image: schedules,

      parent2: 'MeetingMinutes',
      link2: '',
      id2: 'Meeting Minutes',
      image2: meetingMinutes,

      parent3: 'ContactPhoneNumbers',
      link3: '',
      id3: 'Contact Phone Numbers',
      image3: contactPhoneNumbers,
    },

    {
      parent: 'ConstructionTeam',
      link: '/dashboard/constructionTeam',
      id: 'Construction Team',
      image: constructionTeam,

      parent2: 'ConstructorMobilization',
      link2: '',
      id2: 'Constructor Mobilization',
      image2: constructorMobilization,

      parent3: 'Permits',
      link3: '/dashboard/permits',
      id3: 'Permits',
      image3: permits,
    },

    {
      parent: 'Environmental',
      link: '/dashboard/environmental',
      id: 'Environmental',
      image: environmental,

      parent2: 'Clearing',
      link2: '/dashboard/clearing',
      id2: 'Clearing',
      image2: clearing,

      parent3: 'Grading',
      link3: '/dashboard/grading',
      id3: 'Grading',
      image3: grading,
    },

    {
      parent: 'AccessRoads',
      link: '',
      id: 'Access Roads',
      image: accessRoads,

      parent2: 'Material Inventory',
      link2: '/dashboard/inventory',
      id2: 'Material Inventory',
      image2: inventoryImg,

      parent3: 'gpsSurvey',
      link3: '/dashboard/gpsSurvey',
      id3: 'GPS Survey',
      image3: gpsSurvey,
    },

    {
        parent: 'Stringing',
        link: 'dashboard/stringing',
        id: 'Stringing',
        image: stringingImg,

        parent2: 'Trenching',
        link2: '/dashboard/trenching',
        id2: 'Trenching',
        image2: trenching,

        parent3: 'HDD',
        link3: '/dashboard/hdd',
        id3: 'HDD',
        image3: hdd,
    },

    {
        parent: 'Bending',
        link: '/dashboard/bending',
        id: 'Bending',
        image: bendingImg,

        parent2: 'Welding',
        link2: '/dashboard/welding',
        id2: 'Welding',
        image2: weldingImg,

        parent3: 'ValueSites',
        link3: '',
        id3: 'Value Sites',
        image3: valveSites,
    },

    {
        parent: 'Coating',
        link: '/dashboard/coating',
        id: 'Coating',
        image: coatingImg,

        parent2: 'RockShield',
        link2: '',
        id2: 'Rock Shield',
        image2: rockShield,

        parent3: 'Padding',
        link3: '/dashboard/padding',
        id3: 'Padding',
        image3: padding,
    },

    {
        parent: 'Lowering',
        link: '/dashboard/lowering',
        id: 'Lowering',
        image: lowering,

        parent2: 'Backfill',
        link2: '',
        id2: 'Backfill',
        image2: backfill,

        parent3: 'Survey',
        link3: '',
        id3: 'Survey',
        image3: survey,
    },

    {
        parent: 'Abandonment',
        link: '',
        id: 'Abandonment Pipe',
        image: abandonment,

        parent2: 'Pigs',
        link2: '/dashboard/pigs',
        id2: 'Pigs',
        image2: pigs,

        parent3: 'HydrostaticTesting',
        link3: '/dashboard/hydrostaticTesting',
        id3: 'Hydrostatic Testing',
        image3: hydrostaticTesting,
    },

    {
        parent: 'Restoration',
        link: '/dashboard/restoration',
        id: 'Restoration',
        image: restoration,

        parent2: 'InspectorReports',
        link2: '/dashboard/inspectorReports',
        id2: 'Inspector Reports',
        image2: inspectorReports,

        parent3: 'Safety',
        link3: '/dashboard/safety',
        id3: 'Safety',
        image3: safety,
    },

    {
        parent: 'WeatherTracking',
        link: '/dashboard/weatherTracking',
        id: 'WeatherTracking',
        image: weatherTracking,

        parent2: 'Closing',
        link2: '',
        id2: 'Closing',
        image2: closing,

        parent3: 'EnsureDeliverables',
        link3: '',
        id3: 'Ensure Deliverables',
        image3: ensureDeliverables,
    },

    {
        parent: 'RecieveCustomerApproval',
        link: '',
        id: 'Recieve Customer Approval',
        image: recieveCustomerApproval,

        parent2: 'ArchiveDocuments',
        link2: '',
        id2: 'Archive Documents',
        image2: archiveDocuments,

        parent3: 'LessonsLearned',
        link3: '',
        id3: 'Lessons Learned',
        image3: lessonsLearned,
    },
  ];


  const Slides = () => {
      return links;
  }
  export default Slides;