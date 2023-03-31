import React, { Fragment, memo } from 'react'
import { useForm } from 'react-hook-form'
import FormSubmit from '../../../UI/FormSubmit/FormSubmit'
import Input from '../../../UI/Input/Input'
import Button from '../../../UI/Button/Button'
import { Notify } from '../../../UI/Notify/Notify'
// import './BodyInfo.scss'

interface FormValues {
  password_old: string
  password_new: string
  password_comfirm: string
}

const BodyPassword = memo(() => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({ defaultValues: { password_old: '', password_new: '', password_comfirm: '' } })

  const onSubmit = async (data: FormValues) => {
    setValue('password_old', '')
    setValue('password_new', '')
    setValue('password_comfirm', '')
    Notify(200, 'Đổi mật khẩu thành công')
  }
  return (
    <Fragment>
      <div className='profile__body__heading'>
        <div className='profile__body__heading__title'>
          <h2>Mật khẩu</h2>
          {/* <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p> */}
        </div>
      </div>
      <FormSubmit handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <div className='profile__body__formInfo'>
          <div className='profile__body__formInfo__left'>
            <Input
              title='Mật khẩu cũ'
              name='password_old'
              register={register}
              value={`${watch('password_old') || ''}`}
              errors={errors.password_old}
              type='password'
              rules={{ required: 'Không được bỏ trống' }}
            ></Input>
            <Input
              title='Mật khẩu mới'
              name='password_new'
              register={register}
              value={`${watch('password_new') || ''}`}
              errors={errors.password_new}
              type='password'
              rules={{
                required: true,
                minLength: {
                  value: 6,
                  message: 'Cần nhiều hơn 6 ký tự'
                },
                maxLength: {
                  value: 20,
                  message: 'Không được quá 20 ký tự'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
                  message: 'Mật khẩu từ 6-20 ký tự, gồm chữ thường, viết hoa và số'
                }
              }}
            ></Input>
            <Input
              title='Nhập lại mật khẩu mới'
              name='password_comfirm'
              register={register}
              value={`${watch('password_comfirm') || ''}`}
              errors={errors.password_comfirm}
              type='password'
              rules={{
                required: true,
                validate: (value: string) => value === watch('password_new') || 'Mật khẩu không chính xác'
              }}
            ></Input>

            <div className='input__body'>
              <label htmlFor=''></label>
              <Button
                size='large'
                type='primary'
                title='Lưu'
                disabled={watch('password_old') && watch('password_new') && watch('password_comfirm') ? false : true}
              ></Button>
            </div>
          </div>
        </div>
      </FormSubmit>
    </Fragment>
  )
})

export default BodyPassword
