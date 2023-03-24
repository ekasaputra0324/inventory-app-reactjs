$(function () {
    if (!localStorage.getItem('token')) {

    } else {
        const location = window.location.href;
        console.log(window.location.href);
        if (window.location.href === location) {
            let err = JSON.parse(localStorage.getItem('err'));
            let message = 'please wait for the page to load..'
            if (err === null) {
                let timerInterval
                Swal.fire({
                    title: 'Loading..',
                    html: message,
                    timer: 2000,
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
                    localStorage.removeItem('err')
                })
            } else {
                let timerInterval
                Swal.fire({
                    title: 'Loading..',
                    html: err.message,
                    timer: 1800,
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
                    localStorage.removeItem('err')
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
            // cancelButtonColor: '#DCDCDC',
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
            confirmButtonColor: '#d33',
            // cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout it!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token')
                window.location.href = '/'
            }
        })
        
    });
    $('#select').click(function (e) { 
        $('#option').hide();
    });
   $('#export-excel-transaction').click(function (e) { 
    e.preventDefault();
    $("#transaction").table2csv({
        filename: 'transaction.csv'
    })
   });
});
