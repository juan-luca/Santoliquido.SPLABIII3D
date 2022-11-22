
export function validarCamposVaciosClick(controles) {
    
    let flag=0;
    for (const control of controles) {
        if(control.type=="text")
        {
            if (control.value.length <= 0) {
                setError(control);
                flag = 1;
                if (control.classList.contains("inputError")) {
                  flag = 1;
                }
            }else
            {
                clearError(control);
            }  
        }
    }

    return flag;

}

export function validarClases(controles) {
    
    let flag=0;
    for (const control of controles) {
        if(control.type=="text")
        {
            
                if (control.classList.contains("inputError")) {
                  flag = 1;
                }
           
        }
    }
    return flag;

}


export const validarCampoVacio = (e) => {
    const input = e.target;
    const value = input.value.trim();

    if (!value) {
        setError(input);

    } else if (value.length > 0) {

        clearError(input);
        return true;

    }


}

export const validarCantPuertas = (e) => {
    const input = e.target;
    const value = input.value.trim();
    
    
    if (value==5 || value==2 || value==4) {
        
        clearError(input);
        return true;

    }else
    {
        
        setError(input, "Solo puede ingresar 2, 4 o 5 puertas");
    }


}

export const validarCantKms = (e) => {
    const input = e.target;
    const value = input.value.trim();
    
    
    if (value>=0 && value<=200000 && value) {
        
        clearError(input);
        return true;

    }else
    {
        
        setError(input, "Solo puede ingresar entre 0kms y 200000kms");
    }


}
export const validarPotencia = (e) => {
    const input = e.target;
    const value = input.value.trim();
    
    
    if (value>=50 && value<=300) {

        clearError(input);
        return true;

    }else
    {
        setError(input, "Solo puede ingresar entre 50 y 300hp.");
    }


}

export const validarSoloNumeros = (e) => {
    var key = e.charCode;
        
	if (!(key >= 48 && key <= 57)){
      e.preventDefault();
  }

}


export const setError = (input, msg) => {
    const $small = input.nextElementSibling;
    const name = input.name;
    $small.textContent = msg || ` ${name} requerido.`;
    input.classList.add("inputError");
    $small.classList.add("danger");
    
}

export const clearError = (input) => {
    const $small = input.nextElementSibling;

    input.classList.remove("inputError");
    $small.classList.remove("danger");
    $small.textContent = "";
}


 
