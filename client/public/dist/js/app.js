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
                    timer: 1000,
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
    $('.products-update').click(function (e) {
        console.log("oke");
        $('.products-detail').modal('toggle')
    });

    $('.logout').click(function (e) { 
        let id = $(this).attr('data-id')
        Swal.fire({
            title: 'Are you sure?',
            text: "if you logout the application session will end!",
            icon: 'warning',
            confirmButtonColor: '#d33',
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


   const transaction = fetch('http://localhost:5000/transactions', {
     method: 'GET',
     headers: {
        'Content-Type': 'application/json',
     }
   }).then(res => res.json())
     .then(data => {
        if (data.length < 1) {
           $('#deleted-transaction').prop('disabled', true);   
           $('#export-excel-transaction').prop('disabled', true);  
        }else if (data.length > 1){
            $('#deleted-transaction').prop('disabled', false);  
            $('#export-excel-transaction').prop('disabled', false);  
        }
    })

    const product = fetch('http://localhost:5000/product/data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
      .then(data => {
            if (data.data.length > 1) {
                $('#deleted-product').prop('disabled', true)   
                $('#export-excel-product').prop('disabled', false)  
            }else if(data.data.length < 1){
                $('#deleted-product').prop('disabled', true)   
                $('#export-excel-product').prop('disabled', true);  
            }
      })
    //   checkbox
    $('.check').click(function (e) { 
        const value = $(".check").is(":checked");
        console.log(rows);
        if (value === true) {
            $('#deleted-product').prop('disabled', false);  
        }else if(value === false) {
            $('#deleted-product').prop('disabled', true);  
        }     
    });

    $('#rows').click(function (e) { 
       
    });
});

