import swal from 'sweetalert'

const alerts = {
  outOne: () => {
    swal({
      title: "OMG WTF",
      text: "You don't have enough money for that... n00b",
      type: "error",
      confirmButtonText: "I promise to not fuck up again",
      allowOutsideClick: true,
    })
  },
  outTwo: () => {
    swal({
      title: "YOU HELLA DUMB",
      text: "You need more Bitcoins to buy that",
      type: "error",
      confirmButtonText: "I feel ashamed",
      allowOutsideClick: true,
    })
  },
  outThree: () => {
    swal({
      title: "SERIOUSLY, YOU HELLA DUMB",
      text: "How thick are you?",
      type: "error",
      confirmButtonText: "I am hella dumb",
      allowOutsideClick: true,
    })
  },
  max: () => {
    swal({
      title: "YOU MUFUCKA ",
      text: "40 is the max amount... fool",
      type: "error",
      confirmButtonText: "I promise to not screw up again",
      allowOutsideClick: true,
    })
  }
}

export default alerts
