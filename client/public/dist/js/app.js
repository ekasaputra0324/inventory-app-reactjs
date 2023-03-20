$(function () {
    if (!localStorage.getItem('token')) {

    } else {
        const location = window.location.href;
        console.log(window.location.href);
        if (window.location.href === location) {
            let err = JSON.parse(localStorage.getItem('product'));
            let message = 'please wait for the page to load..'
            if (err === null) {
                let timerInterval
                Swal.fire({
                    title: 'Loading..',
                    html: message,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    localStorage.removeItem('product')
                })
            } else {
                let timerInterval
                Swal.fire({
                    title: 'Loading..',
                    html: err.message,
                    timer: 1600,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    localStorage.removeItem('product')
                })
            }
        }



    }
    $('.delete-product').click(async function (e) {
        let id = $(this).attr('data-id')
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#DCDCDC',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'http://localhost:5000/delete/'.concat(id)
            }
        })
    });

    $('.products-update').click(function (e) {
        $('.products-detail').modal('toggle')
    });

    $('.logout').click(function (e) { 
        let id = $(this).attr('data-id')
        Swal.fire({
            title: 'Are you sure?',
            text: "if you logout the application session will end!",
            icon: 'warning',
            // showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout it!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token')
                window.location.href = '/'
            }
        })
        
    });
});
