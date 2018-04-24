import BackHeader from "../components/BackHeader"

import Exam from '../pages/Exam/Container'
import Success from '../pages/Exam/Success'
import ReadyExam from '../pages/Exam/ReadyExam'

export default [
    {
        path: '/success',
        name: 'success',
        components: {
            default: Success,
            header: BackHeader,
        },
        meta: {
            title: '试卷已成功提交'
        }
    },
    {
        path: '/ready-exam',
        name: 'ready-exam',
        components: {
            default: ReadyExam,
            header: BackHeader,
        },
        meta: {
            title: '准备考试'
        }
    },
    {
        path: '/exam',
        name: 'Exam',
        component: Exam,
        meta: {
            title: '考试中心'
        }
    }
];
