import style from './styleCheckbox.module.css'

type CheckboxProps = {
  text: string,
  checked: boolean,
  id: string,
  setCheckedValue: any,
  checkedValue: {id: string, checked:boolean} []
}

export default function Checkbox({text, checked, id, setCheckedValue, checkedValue}:CheckboxProps) {

  const swapValueForCheckbox = (event:any) => {
    console.log(event.target.checked)
    
      const updatedItems = checkedValue.map((item) =>
        item.id === id ? {...item, checked: true } : item
      );
      setCheckedValue(updatedItems);

  }


  return (
    <div className={style.checkboxParent}>
     <label>
          <input type="checkbox"
            defaultChecked = {checked}
            onClick = {swapValueForCheckbox}
            className={style.originalCheckbox}
            id = {id}
          />
          <span className={style.checkboxDecorate}></span>
          <span className={style.text}>{text}</span>
     </label>
    </div>
  )
}
