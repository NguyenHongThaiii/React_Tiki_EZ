import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

TodoHookForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoHookForm(props) {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter a title').min(5, 'Min Length is 5 characters'),
});

  const form = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema),
  });
  const handelOnSumit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values); 
    }
    form.reset()
  };
  return (
    <form onSubmit={form.handleSubmit(handelOnSumit)}>
      <InputField name="title" label="Todos" form={form} />
      <button >click</button>
    </form>
  );
}

export default TodoHookForm;

// import React from 'react';
// import PropTypes from 'prop-types';
// import InputField from '../../../../components/InputField';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";

// TodoHookForm.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
// };

// function TodoHookForm(props) {
//     const schema = yup.object().shape({
//         title: yup.string().required('Please enter information full')
//         .min(5,'Too short'),
//       });
//     const form = useForm({
//         defaultValues: {
//             title: '',
//         },
//         resolver: yupResolver(schema)
//     })
//     const handelOnSumit =(values) => {
//         const {onSubmit} = props;
//         if(onSubmit){
//             onSubmit(values)
//         }
//         form.reset()
//     }
//     return (
//         <form onSubmit={form.handleSubmit(handelOnSumit)}>
//             <InputField name="title" label="Todo" form={form} />
//         </form>
//     );
// }

// export default TodoHookForm;
