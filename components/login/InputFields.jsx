import React from 'react'



function InputField() {
    return (
        <div className="input-field">

            <h1>Welcome Login Panel</h1>

            <img src="\images\Name.png" width={120} height={120} alt="sads" />

            <input className='input-style' type="text" placeholder="username or e-mail" />

            <input className='input-style' type="password" placeholder="password" />

            <input className='button-style' value="Giriş Yap" type="submit" />
            <p>Hesabınız yok mu? <a href='/register' className='register-link'>Kayıt Ol</a></p>

        </div>
    )
}

export default InputField