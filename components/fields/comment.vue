<template>
  <div class="comment-list">
    <h2>Comments:</h2>
    <div class="comment-card comment-form">
      <md-card-header>
        <md-avatar>
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhUQEBAVFRUVFRUVFhUVFxYVFRUXFxUWFxUXFxcYHyggGB0mGxUVITEhJSkrLi4uGCAzODMsNygtLisBCgoKDg0OGhAQGislHSYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIFBgcEAwj/xABFEAABAwEFBQUFBAcFCQAAAAABAAIRAwQFEiExBkFRYXETIoGRoQcyUrHwQnLB0RQjM2KCsuEVQ7PC8TVTVGNzg5KTov/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACIRAQEAAgMBAAICAwAAAAAAAAABAhEDITESQVEiMgQTYf/aAAwDAQACEQMRAD8AtqVKhAgCcgBKAoAJ0JQEqBoCITkiBQnJGhLKBU1zoQ6oBA4/Uryq2honOIjP1QPpVg6dctQV6hyrFa/AH4mNLpBAjfhOccp3qOt+0T470R8IJgnmd/TRZ+438Va695UwQA6TJ0E6ajqoS37QGnVYMQDXPiOUgEz4qnWzaF4DiCASMzwHAKuVL0fWqNh3u5DPjzT62vzpvdJ+IA8V6hZjS2+DGtptY5xbGIvgGBPDU6ZqRsPtGokgVGOaN7tQFrbGqvqVctmvCi9ge2o0tOhkQRyXrStDH5tcD0IKqPRKEiVEKlQE5A1CciECJUQhAqEiEEciE6EQikASpwCIQASpQhAiISoUHlVqRlyJ6Jjnkanx/DLkktrDEjUeRHD0Cr95312bS1zDO5w0PKRlIy/os26bxm/EhVvKmA573QSYaAc8tw8ZMnLNVO8r7c9xpt+0QPqPmqhar1qudk4kkx5nIRvUlRomzjHDatR2pcSGtHARvWLa6ySJq021hcabHANa0YnfC1o0H7ziT6KKvCsACQDJz4YRp4fNe1NpfBdhY3VzW6HqTnokvsg05YwNbE90STzO+OZ9FmRq1UbwtBfl7sbgJJXLYnfrGtbqSBPEk5eRz8F42qoDpluOckrpu5wDg86M7wmcTnNzY0RuxR8l1cd7qWFl7W0Gm34i3/7yPTT0XfZLI5z+zjKT0GZAz8/JJdNGpRb2zx3nbjq2YOfA6eJ5Lvstvw5/acD4DcB4rNrpMTy9tCRmWggETk45k+gOastzbSWd5DTQ7KIAcInlMa+Kz+8racAbp3iPA+8euXqV27PXm2RTrEuZkNzsPgdY4equPTGXdbTQcCAQZC9IUDcBqUzgObDBacy4CMw6deI3x0U+F0cjgEoCAlRCISpEAkSppQCVIlRXFCIToRCBISwlAToQNCEsJQECIToTXkCSSAAJlQQ+0V6Cz0i6CXHINBgk9dwG/os0q2x1Qve8zk0gfZGZOXl8lZNsKpq6Tv8AAZR4kj15KkWinUY44ZwiRnmCct29crdvRjjqPKzvaKhdhMNJO4GdcukHzU2LFUqtAALjIggZGDmCRuiR/qprYzYWpXc2tXbgYM+bt+UhapZLjs9IQ2mPLRc7n+naYftjjbnrBre0BjNzmic5JIledSi6m0loiTnOUg/Ed/RbVXu+k4e6FXbz2ZZ/dmANBwU+z/Xvxit92Ckxoe0S85y0HD4CMlCWSW1GlwIEzP2oHBa9btlwwHBkeQHoqVfVzVQfcccszx1zPmuuPJK5Z8OUdFkt/agMpkQ2DJyProPNRdoqxUOEghpLidxO4Dlp6qHqU6lOciPD8eC8qltLgA45Ddz6LUjFyv5elotWNxedG6D8Ut22tzXhzc4I168OC47QAYgRmvWxCCIK05xtmyV4OeGGRhgNOcxuEQMoyy4FXRoWdezK1seDReBIGNm8EaGJzkTp0WisCsTKdnhKkSqskSFOSFA1EJYSwikQnJERxp0ISgIoASwlASwgbCIToRCBIULf76jm4KbsM68SN8c1OKHvetTbLXBxMTA3889FnLxrH1SLZVAyfucSRPvDLPr+alNi7jdaqprVmjAxxwt3F249B+Kg6g7VwGRzggZnXKfzWwbH3cKVBojmvNe+ntl+ZtK2WyBogCEV6cLvavGuRC38SRwnJbkiSdy57Scl0V8iuK1HcuFe3FEWuCoe10gZyUvaTCibTViVG9Kxed2sdqAqne+zu9gV0tlSSuZpXXHKxw5MJWb1LI9rYcNDM+i9bJSgYo6zJ8+CuV42MEF2GYE+CpNutDmzSkhmsRn0XfHLbyZ4/LQPZtXDq7NAJdh5y0gjL6yWutCwjYau6lWoVD/vAIPAgjLz9FvC1i55BKhKtMEQnQiEDYSoQgchCEHFCcEQnAIoCVCUBAiEsIhAipG3bDIcDoWiQSHSdQCPNXiFTNtLcGPaC2QRmeBGnRZy8bw9VjZ9gbUEzkASCftSZjyW43I/9W3oFgtOC8PpPAO4TmTMn0K3HZ55NnpHixvyyXnvVeq941NucvB4XPbbyp0cnnPhrHVRz9qLMNakdQYz03LdrljjXvaW5qNtTl7/ANtWeoJbVYeUrmtBBXHKPZhenBXpzmoK8hEqy1agAzVava2UQCXPACzp0+pPUDXC52oq3zZQYFQHoU1tqpPMMeCeHHoukxsccs5Uld9kxmCJyzWfX1QDbWQWyMuhhavdbWim52hgn0WU39bJqnD3jMZdV1xjy8lTGzLR+kUGPOlRhJ5kgN+ZW4rDNmXtxUSTEVWO9Qdeq3NdMXHIJwSJQtMnhIQlCCiGlIgoCKchLCERywlQhFCcEiUIBCVCDwtbiGHCJMZRH4rNNrnVajYc0tcD70GI8J4LT6rZBUPaLoY8Q5ojjGg8VnJvD1jVkoQ8CTnvHyX0LYw6nZqTGHvYGCZ/dErJr0u8io11MQ2o/u8T3vr1W0U6Awjk0D0Xnyu+3s+fnqq3a7qY7NzjJmcJIz/FVq9Lk/5zx5EHmrXeF2Wqo4mnGHcC4sDurgC6OQjqqNtpc95CG0IIJGJ8U2hnxAMcC5w5l5Kk3f8AjplMJ+NuWwXI1j8QrOngRl6K+3fZXYJ1y14qk3HdVYPY3jOM90RnkYGRyWpXXZeypFs4stVnu3trKY4yajPtoL47MlrjESs5vC1Gs4htQnPSMlZ/apScAXN0L2gngCDHqqhcNiL3jEIbqXRj8A0H1K6YTrbhyb+vkrdmqju850b9E5lxOacnzz4eK6bY63NfhayGBrZJ7MS7LFhwRA1gGTlmuihbHtgvpP56OAjeHN+RA6rpusfOP6q0bPPrNYWVCXSDhMcoIJ4j6JWWWontXB3xH5lazctVtRstOmf9Fnu0l1tZa3NJjEcXOCdRxTG9sZzp77PDtajKeYzPTQ/0W82V0saTwHyWEXPdr+3YxlSS4tLXRHAgwfJbldePs29o0NdGYGi3i5ZzTqShAShaYPCCgIKI83JQEFK1FPhCVCI40qRKEUqUJEqBUIQgEhpg7k5Kiy6u1QvS6R+mWdjTAbgGHcc5cfEkrR6JyUPeNla5nbgd+nhcCN4BzB8FL2YgieOY+a8kll1Xv5cplNw2vO5Ql42F9TLEI8SrC9kry7OFbjtOPk+fFesGzLMQc7P8VZXUwGOH7q8aFWXQF0VXAA9CmMn4Z5M8ssptlu0lnbWNam4ZYfks2uqhheWgnIkLTNomltR5+IGPVZzdMtqkPBGZ135q43+LryT+ayUbPUcPenqPyT6tmfhwuMDgN/VSNjiEtpAWNulk08bmpBrsoUJt/Y/1tN4b9kyeQMqzXXR7wK49rLOazxRYO89opgmSAXOmcvu+q6Tp5rN3SJ2DsXbWmi4H3RU6DC0EfzrWqNPCAJmN6p/s3ukUWOfOKJYHDRzpBqYeIGFjZ3wVdF1w8cP8iz61PwAlCAhbcShKUiEQkJQhKgchIhByJwTU4IpyWEIQCEIQCUJEoQdNmr4e6RLTqF7WF8d3gSPAHJcS9LG8yRwPzErjyz8vRw3e8UviXBbK5Gi9i7JR1euARzK45ZO/Hj3t1Nqspgl5hoGZ+aj6W1NirBzKNdj3AGWgiY5DeuqraWgaj6+arN6VaLScNNsjfAy5ytbdMccb3doe+70ovhz3hrGSXngBOqpV7XzY30X9njxk/q5bh7wIzzziJT7zpm01HUnudhAkYcmzOsDXVV2pYXUid4GXFaxkZ5Mrtadnb1xNEqZq1pI5qgWes6k4EaHwg7lYbuvDG6DqIkeoP4KXHvaTk3NL3YqYa0cckWWyOr1KkZZFuLhPdJ8pXBZLaHPqjczA3xgE/irlc7IoU+bQT1Of4reM28+WXz29bFZWUabaVMQ1gAAXqSlTSuzz3u7ATk0JwQKEIQiBKhAQOhCVIiuRKEiUIHhKkSoBCEIBAQhA9ebTD+rfkU8LxtYyxZ92SY1iIP5+CxyTeNdeG6ziTLpETEqpXveTMRaCct0EgeQP0VOU7UCBnn8xGXivKx02CoZAmZnqvHfXuwmkU6vizYKjjwFOpy5KMt9lq5ubZ3nrp5K+1HsIzgqJt1SnB1810kjphnj+Yzl1S0sMCzZjOcPooa0PqucTVs5zzmACPVW68bcwOIDgOqiBaWOdmcW/l/otYrzZYWdKhbqxyaLMWycnPMSBvACktnbG4Pc5+ZcWgDdAzldl9ODiH8NByzJKddRIa47zk3qdTmra8evyk7iYS2q/fVrVCBvAkho9R5LTabMLQ34QB5CFSNlLOH1WsA7tMYjwyOR5y7dyV5XTD9uHLe9ETSnJpXRyInBNT2hAoSoQgEqRKiFQhCo5UoQgKKVOCaEoQOQkShAISoQAT2NndI39Popi7W2Z3Y4hriaerQYI+ZWcv61vj/tFVtlM0HgGYEwRoQJInmMh4BdtO0AnHGvLPLcu68bI2qwtPhyVbsFZ1OoaT9dRuHhxXgvr6c8TjqziN4UbeNlqubwB4rsoWsYojPWee8Lkve8RBAcBzhbxqRnt/wB31Q6cvPQLms7CBxU3elqaQcTvrcoGta93H6j64rptjKQ8kOMRJ9ByK7KTtzREZZcTquKywOpjnBOny9VK2Nobl9o68p1j5quK57H2UU2OO84QTyEwFYFXNmLViqVKYzDGMLuTnEwOsR5qxrvh482f9iFNKcmrTAhPCaE4IFSpEqIRKEIVCoQhBzJQmhOUUJUIQCUJEIHApU1KCgZXrtZhk5uc1jRvc5xgAKzupdzAPhgeSzXZ+0G33mx391Qa+o0boHcYTzJdi8BwWoJYviuVJjfzHTUKBvix4ziEBzcwRr09Vbrzsp/aNH3gN/Mc1FYA7gV4s8Pmvo8Wcyx3FNr2wsyeIzjP18FVrzvqDHGQRqI6rV69gp1BD2qnX9svSMlrY6KY6i3d8Z3+nF24mJiSks7MepOQiAM93h5rvvC4nMmCeihalR9MESSfRdp3443c9SlS2NpZzL93AJLuvN73inQb2lZxy+Bk5YjxjgoKy3dVtLjG73nH3WjifyV1uGg2yNig2Xn3qrhn/CFuYuWWWluumk2x02Wdr5q1HTUecyXu+0fHdopLZO/RbrOKsYajXGnWZ8FRmTo5HUcioC6aJLsTzLpBz15Ku7OXt/Z1526k+TSfXcXcW4iXtcBvgO03hdY89aykTadRr2h7HBzXCQ4GQRxBTkCgpyYnIFToSNToRAhCFQqEkoQcieCmJQop6EBKgRCjb1v+y2UfrqzQfgb3nn+EZ+ap15+0Go6W2akGD43w556N0Hqgv1qtLKTDUqODWjUn5AbzyVD2h2qfXmjSBZTdk4/beOfwjkFE1q9WoMdZ7nvOckzHIDQeC56be9K1pWj+ySzibVV34qdMdGtLj/MPJaIs39j9qE2ulwex46Fpaf5QtIWSkIUVb7AQS+kJ3uZx5t4HlvUskWcsZlNVcM7jdxVW2oESD55KPt5xBTF92SkH421WMe7VjnAdod2RzmBqFEPa45YDPSfIjJebLjuL3YcsyVO9aeRAGZUFYNkqlreQO6xp774kN5Di7l5q4259js7h+mV8E/ZYDUqHwYDh6lSg2ju59NtKhW7JgEAOZUp9ZLm5nmt8eF/LHLySdRW6t1UaDRTaO63dqSd7nHeV5Uqbye43+I7ugVjomwOzFroO/wC6z8101adMNmmWn7pB+S7608m0DdNgIqtJMmZKznaeuDe1sLdMbR4hjQfUFat2zaDKld2jGOcfAZeqwKzWsvr1KrjnUe556ucT+KsZXK4Nra9hdDe/SJ71JxgT8TTq09MuSvN0e0e765wVKhs79MNX3Z5VB3fOFjNatqo60Gc/A9NytH1JSeHAOaQ5p0c0gg+IyXqF8uXbedezuxWes+keLHFvmBkfFXe5fatbaUC0NZaG8TFN/wD5MEHxaoNvanKoXJ7RLvtMB1Q0X/DVEDweO75wrZRqteMTHNcOLSHD0VDkiEIhUIQg5Sua226lQGKtVZTH7xA8hqfBZbeW1VvryO2NNvw0hg8z73qoR1Ek4nEk8XZk+JTTWmhXn7RaLMrNSdVPxPmmzy94+iq147V260yDV7Nh+zSGAeLvePmo2lQC9DThXQ5MEdTmV2XXRl0nRufju/EryLFIWJoaI37+uX4QqOx+a82CCvTcmhBL+zW8BRvIsJgVGuB4ZNxZ+S0q89sLPSOCnNV37vuj+Lf4SsMu1zf7SpTmA4OI6Z6LcrNd1Go9r8IzG4LnfVQNs2kvCribTaKQ0xNaHObOhGOQT4LN9saF9USKte1169E5EhxYzOMnBkBh5HLgSt6NhYXvEatARTsbS1zSBmII3cx0WoPmSwPYyo2s2mC4GS0iC7eQTxjetCvL2p2ZtLsqFCrkBGINAmM5JOeeWm5J7TNkbLZKTbbZ2GmXVGsdTb+zl2KTh+xpoIHJZhbWDgrrYla22Ba81BZaeIkmXucT4gZKHv3a202nuuLWM+GmC0HmTMnpMKJttTgvCy08Thw1KCcuO5WvipVbqZAOkbiRv6K7WW735dlLI3t7p8I0XBsxd7qjg9+emq0S7rGMRbyUorW0Vuri7q1Op3nloh28gOEz6ZrJLPLXdFs3tPp9nZacQMT8Hpi/yrGquTiVIlPq1FzlyHvXmEQ9vBPC89CvQIHNcQuqyW99I4qbnMdxYS0+bVywhUXu5faXb6MCo8V28Ko73hUbn5yr7cvtKsVeG1sVnefj71OeVRoy8QFg4K9WVSEH0t/b1j/4uh/7WfmlXzd+kpUFy7NDqS6XBeRH1mtNOfDCeOnzTi36hMj6hA4MjM6eKWyuJMnfJ9U3HAzHz6n66pKdQajSfVEScryrPjT3jpwHM8k3tgBOpOg4/wBOa8jOZJknX+nAIIpr+yrtqZ6uk8ZaRn59At92OtQqUmP/AHQsBvNmU8M/Vav7Lrxx0msnTJYvrU8aM0/rD0CeMnHmvFroqHpC9aw3jcjKpe1ahN21zE96i7oRWYJHAwV89XhkPr64/Ur6M9prpuq0/dZ/isXzXedZugcFqLEJaHSVMXFY5Acd5UNBc6BqT6q43ZSGJlMaCEF/2YsmmSt9ipd8qI2coRCsdmZms7FD9tVoDW2al/1Kh9GD/MscrjNaR7ZLVjtuDdTo02eJxPP84Wbv1VSuZzSlphdIZkuSq4gwAiFqkL0pleVOgdSulrECgIhLCdCo84SL0KYQoElCEINNfqvMoQtK8z9ei8amn1zQhB4jeuGx++77yEIJahqPuN/mK9qmqEIqMvv3D9blevZJ+KELGSxqp99dVXRCFEqo+1D/AGRa/uN/xGL53r6ef+ZCFqKjKf7Vv3m/NW65P2oQhL4RrNw6BTdn1QhZRjXtQ/2hW/g/wmKkP1QhaSn7l51dG/XFCER5lCEKgQhCAK8yhCgRCEIP/9k="
            alt="Avatar"
          >
        </md-avatar>
        <div class="md-commentor">{{ 'Mohsen Bagheri' }}</div>
        <div class="md-right">
          <md-button class="md-dense md-primary">Submit</md-button>
        </div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Write your comment</label>
          <md-textarea :class="{'active': textareaActive}" @click="textareaActive = true"></md-textarea>
        </md-field>
      </md-card-content>
    </div>
    <div v-for="c in commentList">
      <div :class="{ 'reply-comment': c.reply }">
        <div class="comment-card">
          <div class="md-layout">
            <div class="md-layout-item md-size-20">
              <div class="user-details">
                <md-avatar>
                  <img
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhUQEBAVFRUVFRUVFhUVFxYVFRUXFxUWFxUXFxcYHyggGB0mGxUVITEhJSkrLi4uGCAzODMsNygtLisBCgoKDg0OGhAQGislHSYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIFBgcEAwj/xABFEAABAwEFBQUFBAcFCQAAAAABAAIRAwQFEiExBkFRYXETIoGRoQcyUrHwQnLB0RQjM2KCsuEVQ7PC8TVTVGNzg5KTov/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACIRAQEAAgMBAAICAwAAAAAAAAABAhEDITESQVEiMgQTYf/aAAwDAQACEQMRAD8AtqVKhAgCcgBKAoAJ0JQEqBoCITkiBQnJGhLKBU1zoQ6oBA4/Uryq2honOIjP1QPpVg6dctQV6hyrFa/AH4mNLpBAjfhOccp3qOt+0T470R8IJgnmd/TRZ+438Va695UwQA6TJ0E6ajqoS37QGnVYMQDXPiOUgEz4qnWzaF4DiCASMzwHAKuVL0fWqNh3u5DPjzT62vzpvdJ+IA8V6hZjS2+DGtptY5xbGIvgGBPDU6ZqRsPtGokgVGOaN7tQFrbGqvqVctmvCi9ge2o0tOhkQRyXrStDH5tcD0IKqPRKEiVEKlQE5A1CciECJUQhAqEiEEciE6EQikASpwCIQASpQhAiISoUHlVqRlyJ6Jjnkanx/DLkktrDEjUeRHD0Cr95312bS1zDO5w0PKRlIy/os26bxm/EhVvKmA573QSYaAc8tw8ZMnLNVO8r7c9xpt+0QPqPmqhar1qudk4kkx5nIRvUlRomzjHDatR2pcSGtHARvWLa6ySJq021hcabHANa0YnfC1o0H7ziT6KKvCsACQDJz4YRp4fNe1NpfBdhY3VzW6HqTnokvsg05YwNbE90STzO+OZ9FmRq1UbwtBfl7sbgJJXLYnfrGtbqSBPEk5eRz8F42qoDpluOckrpu5wDg86M7wmcTnNzY0RuxR8l1cd7qWFl7W0Gm34i3/7yPTT0XfZLI5z+zjKT0GZAz8/JJdNGpRb2zx3nbjq2YOfA6eJ5Lvstvw5/acD4DcB4rNrpMTy9tCRmWggETk45k+gOastzbSWd5DTQ7KIAcInlMa+Kz+8racAbp3iPA+8euXqV27PXm2RTrEuZkNzsPgdY4equPTGXdbTQcCAQZC9IUDcBqUzgObDBacy4CMw6deI3x0U+F0cjgEoCAlRCISpEAkSppQCVIlRXFCIToRCBISwlAToQNCEsJQECIToTXkCSSAAJlQQ+0V6Cz0i6CXHINBgk9dwG/os0q2x1Qve8zk0gfZGZOXl8lZNsKpq6Tv8AAZR4kj15KkWinUY44ZwiRnmCct29crdvRjjqPKzvaKhdhMNJO4GdcukHzU2LFUqtAALjIggZGDmCRuiR/qprYzYWpXc2tXbgYM+bt+UhapZLjs9IQ2mPLRc7n+naYftjjbnrBre0BjNzmic5JIledSi6m0loiTnOUg/Ed/RbVXu+k4e6FXbz2ZZ/dmANBwU+z/Xvxit92Ckxoe0S85y0HD4CMlCWSW1GlwIEzP2oHBa9btlwwHBkeQHoqVfVzVQfcccszx1zPmuuPJK5Z8OUdFkt/agMpkQ2DJyProPNRdoqxUOEghpLidxO4Dlp6qHqU6lOciPD8eC8qltLgA45Ddz6LUjFyv5elotWNxedG6D8Ut22tzXhzc4I168OC47QAYgRmvWxCCIK05xtmyV4OeGGRhgNOcxuEQMoyy4FXRoWdezK1seDReBIGNm8EaGJzkTp0WisCsTKdnhKkSqskSFOSFA1EJYSwikQnJERxp0ISgIoASwlASwgbCIToRCBIULf76jm4KbsM68SN8c1OKHvetTbLXBxMTA3889FnLxrH1SLZVAyfucSRPvDLPr+alNi7jdaqprVmjAxxwt3F249B+Kg6g7VwGRzggZnXKfzWwbH3cKVBojmvNe+ntl+ZtK2WyBogCEV6cLvavGuRC38SRwnJbkiSdy57Scl0V8iuK1HcuFe3FEWuCoe10gZyUvaTCibTViVG9Kxed2sdqAqne+zu9gV0tlSSuZpXXHKxw5MJWb1LI9rYcNDM+i9bJSgYo6zJ8+CuV42MEF2GYE+CpNutDmzSkhmsRn0XfHLbyZ4/LQPZtXDq7NAJdh5y0gjL6yWutCwjYau6lWoVD/vAIPAgjLz9FvC1i55BKhKtMEQnQiEDYSoQgchCEHFCcEQnAIoCVCUBAiEsIhAipG3bDIcDoWiQSHSdQCPNXiFTNtLcGPaC2QRmeBGnRZy8bw9VjZ9gbUEzkASCftSZjyW43I/9W3oFgtOC8PpPAO4TmTMn0K3HZ55NnpHixvyyXnvVeq941NucvB4XPbbyp0cnnPhrHVRz9qLMNakdQYz03LdrljjXvaW5qNtTl7/ANtWeoJbVYeUrmtBBXHKPZhenBXpzmoK8hEqy1agAzVava2UQCXPACzp0+pPUDXC52oq3zZQYFQHoU1tqpPMMeCeHHoukxsccs5Uld9kxmCJyzWfX1QDbWQWyMuhhavdbWim52hgn0WU39bJqnD3jMZdV1xjy8lTGzLR+kUGPOlRhJ5kgN+ZW4rDNmXtxUSTEVWO9Qdeq3NdMXHIJwSJQtMnhIQlCCiGlIgoCKchLCERywlQhFCcEiUIBCVCDwtbiGHCJMZRH4rNNrnVajYc0tcD70GI8J4LT6rZBUPaLoY8Q5ojjGg8VnJvD1jVkoQ8CTnvHyX0LYw6nZqTGHvYGCZ/dErJr0u8io11MQ2o/u8T3vr1W0U6Awjk0D0Xnyu+3s+fnqq3a7qY7NzjJmcJIz/FVq9Lk/5zx5EHmrXeF2Wqo4mnGHcC4sDurgC6OQjqqNtpc95CG0IIJGJ8U2hnxAMcC5w5l5Kk3f8AjplMJ+NuWwXI1j8QrOngRl6K+3fZXYJ1y14qk3HdVYPY3jOM90RnkYGRyWpXXZeypFs4stVnu3trKY4yajPtoL47MlrjESs5vC1Gs4htQnPSMlZ/apScAXN0L2gngCDHqqhcNiL3jEIbqXRj8A0H1K6YTrbhyb+vkrdmqju850b9E5lxOacnzz4eK6bY63NfhayGBrZJ7MS7LFhwRA1gGTlmuihbHtgvpP56OAjeHN+RA6rpusfOP6q0bPPrNYWVCXSDhMcoIJ4j6JWWWontXB3xH5lazctVtRstOmf9Fnu0l1tZa3NJjEcXOCdRxTG9sZzp77PDtajKeYzPTQ/0W82V0saTwHyWEXPdr+3YxlSS4tLXRHAgwfJbldePs29o0NdGYGi3i5ZzTqShAShaYPCCgIKI83JQEFK1FPhCVCI40qRKEUqUJEqBUIQgEhpg7k5Kiy6u1QvS6R+mWdjTAbgGHcc5cfEkrR6JyUPeNla5nbgd+nhcCN4BzB8FL2YgieOY+a8kll1Xv5cplNw2vO5Ql42F9TLEI8SrC9kry7OFbjtOPk+fFesGzLMQc7P8VZXUwGOH7q8aFWXQF0VXAA9CmMn4Z5M8ssptlu0lnbWNam4ZYfks2uqhheWgnIkLTNomltR5+IGPVZzdMtqkPBGZ135q43+LryT+ayUbPUcPenqPyT6tmfhwuMDgN/VSNjiEtpAWNulk08bmpBrsoUJt/Y/1tN4b9kyeQMqzXXR7wK49rLOazxRYO89opgmSAXOmcvu+q6Tp5rN3SJ2DsXbWmi4H3RU6DC0EfzrWqNPCAJmN6p/s3ukUWOfOKJYHDRzpBqYeIGFjZ3wVdF1w8cP8iz61PwAlCAhbcShKUiEQkJQhKgchIhByJwTU4IpyWEIQCEIQCUJEoQdNmr4e6RLTqF7WF8d3gSPAHJcS9LG8yRwPzErjyz8vRw3e8UviXBbK5Gi9i7JR1euARzK45ZO/Hj3t1Nqspgl5hoGZ+aj6W1NirBzKNdj3AGWgiY5DeuqraWgaj6+arN6VaLScNNsjfAy5ytbdMccb3doe+70ovhz3hrGSXngBOqpV7XzY30X9njxk/q5bh7wIzzziJT7zpm01HUnudhAkYcmzOsDXVV2pYXUid4GXFaxkZ5Mrtadnb1xNEqZq1pI5qgWes6k4EaHwg7lYbuvDG6DqIkeoP4KXHvaTk3NL3YqYa0cckWWyOr1KkZZFuLhPdJ8pXBZLaHPqjczA3xgE/irlc7IoU+bQT1Of4reM28+WXz29bFZWUabaVMQ1gAAXqSlTSuzz3u7ATk0JwQKEIQiBKhAQOhCVIiuRKEiUIHhKkSoBCEIBAQhA9ebTD+rfkU8LxtYyxZ92SY1iIP5+CxyTeNdeG6ziTLpETEqpXveTMRaCct0EgeQP0VOU7UCBnn8xGXivKx02CoZAmZnqvHfXuwmkU6vizYKjjwFOpy5KMt9lq5ubZ3nrp5K+1HsIzgqJt1SnB1810kjphnj+Yzl1S0sMCzZjOcPooa0PqucTVs5zzmACPVW68bcwOIDgOqiBaWOdmcW/l/otYrzZYWdKhbqxyaLMWycnPMSBvACktnbG4Pc5+ZcWgDdAzldl9ODiH8NByzJKddRIa47zk3qdTmra8evyk7iYS2q/fVrVCBvAkho9R5LTabMLQ34QB5CFSNlLOH1WsA7tMYjwyOR5y7dyV5XTD9uHLe9ETSnJpXRyInBNT2hAoSoQgEqRKiFQhCo5UoQgKKVOCaEoQOQkShAISoQAT2NndI39Popi7W2Z3Y4hriaerQYI+ZWcv61vj/tFVtlM0HgGYEwRoQJInmMh4BdtO0AnHGvLPLcu68bI2qwtPhyVbsFZ1OoaT9dRuHhxXgvr6c8TjqziN4UbeNlqubwB4rsoWsYojPWee8Lkve8RBAcBzhbxqRnt/wB31Q6cvPQLms7CBxU3elqaQcTvrcoGta93H6j64rptjKQ8kOMRJ9ByK7KTtzREZZcTquKywOpjnBOny9VK2Nobl9o68p1j5quK57H2UU2OO84QTyEwFYFXNmLViqVKYzDGMLuTnEwOsR5qxrvh482f9iFNKcmrTAhPCaE4IFSpEqIRKEIVCoQhBzJQmhOUUJUIQCUJEIHApU1KCgZXrtZhk5uc1jRvc5xgAKzupdzAPhgeSzXZ+0G33mx391Qa+o0boHcYTzJdi8BwWoJYviuVJjfzHTUKBvix4ziEBzcwRr09Vbrzsp/aNH3gN/Mc1FYA7gV4s8Pmvo8Wcyx3FNr2wsyeIzjP18FVrzvqDHGQRqI6rV69gp1BD2qnX9svSMlrY6KY6i3d8Z3+nF24mJiSks7MepOQiAM93h5rvvC4nMmCeihalR9MESSfRdp3443c9SlS2NpZzL93AJLuvN73inQb2lZxy+Bk5YjxjgoKy3dVtLjG73nH3WjifyV1uGg2yNig2Xn3qrhn/CFuYuWWWluumk2x02Wdr5q1HTUecyXu+0fHdopLZO/RbrOKsYajXGnWZ8FRmTo5HUcioC6aJLsTzLpBz15Ku7OXt/Z1526k+TSfXcXcW4iXtcBvgO03hdY89aykTadRr2h7HBzXCQ4GQRxBTkCgpyYnIFToSNToRAhCFQqEkoQcieCmJQop6EBKgRCjb1v+y2UfrqzQfgb3nn+EZ+ap15+0Go6W2akGD43w556N0Hqgv1qtLKTDUqODWjUn5AbzyVD2h2qfXmjSBZTdk4/beOfwjkFE1q9WoMdZ7nvOckzHIDQeC56be9K1pWj+ySzibVV34qdMdGtLj/MPJaIs39j9qE2ulwex46Fpaf5QtIWSkIUVb7AQS+kJ3uZx5t4HlvUskWcsZlNVcM7jdxVW2oESD55KPt5xBTF92SkH421WMe7VjnAdod2RzmBqFEPa45YDPSfIjJebLjuL3YcsyVO9aeRAGZUFYNkqlreQO6xp774kN5Di7l5q4259js7h+mV8E/ZYDUqHwYDh6lSg2ju59NtKhW7JgEAOZUp9ZLm5nmt8eF/LHLySdRW6t1UaDRTaO63dqSd7nHeV5Uqbye43+I7ugVjomwOzFroO/wC6z8101adMNmmWn7pB+S7608m0DdNgIqtJMmZKznaeuDe1sLdMbR4hjQfUFat2zaDKld2jGOcfAZeqwKzWsvr1KrjnUe556ucT+KsZXK4Nra9hdDe/SJ71JxgT8TTq09MuSvN0e0e765wVKhs79MNX3Z5VB3fOFjNatqo60Gc/A9NytH1JSeHAOaQ5p0c0gg+IyXqF8uXbedezuxWes+keLHFvmBkfFXe5fatbaUC0NZaG8TFN/wD5MEHxaoNvanKoXJ7RLvtMB1Q0X/DVEDweO75wrZRqteMTHNcOLSHD0VDkiEIhUIQg5Sua226lQGKtVZTH7xA8hqfBZbeW1VvryO2NNvw0hg8z73qoR1Ek4nEk8XZk+JTTWmhXn7RaLMrNSdVPxPmmzy94+iq147V260yDV7Nh+zSGAeLvePmo2lQC9DThXQ5MEdTmV2XXRl0nRufju/EryLFIWJoaI37+uX4QqOx+a82CCvTcmhBL+zW8BRvIsJgVGuB4ZNxZ+S0q89sLPSOCnNV37vuj+Lf4SsMu1zf7SpTmA4OI6Z6LcrNd1Go9r8IzG4LnfVQNs2kvCribTaKQ0xNaHObOhGOQT4LN9saF9USKte1169E5EhxYzOMnBkBh5HLgSt6NhYXvEatARTsbS1zSBmII3cx0WoPmSwPYyo2s2mC4GS0iC7eQTxjetCvL2p2ZtLsqFCrkBGINAmM5JOeeWm5J7TNkbLZKTbbZ2GmXVGsdTb+zl2KTh+xpoIHJZhbWDgrrYla22Ba81BZaeIkmXucT4gZKHv3a202nuuLWM+GmC0HmTMnpMKJttTgvCy08Thw1KCcuO5WvipVbqZAOkbiRv6K7WW735dlLI3t7p8I0XBsxd7qjg9+emq0S7rGMRbyUorW0Vuri7q1Op3nloh28gOEz6ZrJLPLXdFs3tPp9nZacQMT8Hpi/yrGquTiVIlPq1FzlyHvXmEQ9vBPC89CvQIHNcQuqyW99I4qbnMdxYS0+bVywhUXu5faXb6MCo8V28Ko73hUbn5yr7cvtKsVeG1sVnefj71OeVRoy8QFg4K9WVSEH0t/b1j/4uh/7WfmlXzd+kpUFy7NDqS6XBeRH1mtNOfDCeOnzTi36hMj6hA4MjM6eKWyuJMnfJ9U3HAzHz6n66pKdQajSfVEScryrPjT3jpwHM8k3tgBOpOg4/wBOa8jOZJknX+nAIIpr+yrtqZ6uk8ZaRn59At92OtQqUmP/AHQsBvNmU8M/Vav7Lrxx0msnTJYvrU8aM0/rD0CeMnHmvFroqHpC9aw3jcjKpe1ahN21zE96i7oRWYJHAwV89XhkPr64/Ur6M9prpuq0/dZ/isXzXedZugcFqLEJaHSVMXFY5Acd5UNBc6BqT6q43ZSGJlMaCEF/2YsmmSt9ipd8qI2coRCsdmZms7FD9tVoDW2al/1Kh9GD/MscrjNaR7ZLVjtuDdTo02eJxPP84Wbv1VSuZzSlphdIZkuSq4gwAiFqkL0pleVOgdSulrECgIhLCdCo84SL0KYQoElCEINNfqvMoQtK8z9ei8amn1zQhB4jeuGx++77yEIJahqPuN/mK9qmqEIqMvv3D9blevZJ+KELGSxqp99dVXRCFEqo+1D/AGRa/uN/xGL53r6ef+ZCFqKjKf7Vv3m/NW65P2oQhL4RrNw6BTdn1QhZRjXtQ/2hW/g/wmKkP1QhaSn7l51dG/XFCER5lCEKgQhCAK8yhCgRCEIP/9k="
                    alt="Avatar"
                  >
                </md-avatar>
                <div class="md-title">{{ c.user }}</div>
                <div class="md-date">{{ c.date }}</div>
              </div>
            </div>
            <div class="md-layout-item">
              <div class="md-comment-body">
                <p>{{ c.body }}</p>
                <div class="comment-action">
                  <md-button class="md-icon-button md-dense">
                    <md-icon class="md-red">clear</md-icon>
                    <md-tooltip md-direction="bottom">Delete this Comment</md-tooltip>
                  </md-button>
                  <md-button class="md-icon-button md-default md-dense">
                    <md-icon>edit</md-icon>
                    <md-tooltip md-direction="bottom">Edit this Comment</md-tooltip>
                  </md-button>
                  <md-button class="md-icon-button md-primary md-dense">
                    <md-icon>reply</md-icon>
                    <md-tooltip md-direction="bottom">Reply to this Comment</md-tooltip>
                  </md-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: ["nid"],
  data() {
    return {
      commentList: [],
      textareaActive: false
    };
  },
  mounted() {
    console.log(this.nid);
    this.getComments();
  },
  methods: {
    getComments() {
      this.$axios
        .get("https://api.myjson.com/bins/tyay0")
        .then(response => {
          console.log(response.data);
          this.commentList = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computer: {
    fieldGrow: function() {
      return this.textareaActive ? "active" : "";
    }
  }
};
</script>

<style lang='scss' scoped>
@mixin main-center-content() {
  max-width: 800px;
  text-align: left;
  direction: ltr;
  margin: auto;
  padding: 0 15px;
}
.comment-list {
  @include main-center-content();
  .comment-card {
    padding: 10px 0;
    padding-bottom: 5px;
    margin-top: 20px;
    border-radius: 3px;
    border: 1px solid #d9d9d9;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.09);
  }
  .comment-form {
    padding: 0;
    .md-card-header {
      position: relative;
      margin-bottom: 0;
      border-bottom: 1px solid #d9d9d9;
      .md-commentor {
        line-height: 40px;
        display: inline-flex;
      }
      .md-right {
        position: absolute;
        right: 16px;
        top: 16px;
        padding: 4px;
        display: inline-block;
      }
    }
    .md-card-content {
      padding: 16px;
      .md-field.md-theme-default.md-has-textarea:not(.md-autogrow):after {
        border-color: #d9d9d9;
      }
      .md-field {
        margin-bottom: 5px;
        .md-textarea {
          min-height: 50px;
          transition: 1s;
          -webkit-transition: 1s;
        }
        .md-textarea.active {
          height: auto;
          min-height: 100px;
          transition: 1s;
          -webkit-transition: 1s;
        }
      }
    }
  }
  .user-details {
    text-align: center;
    align-content: center;
    padding: 5px 5px;
    .md-title {
      font-size: 12px;
    }

    .md-avatar {
      display: block;
      width: 48px;
      height: 48px;

      margin: 5px auto;
    }
    .md-date {
      font-size: 10px;
    }
  }
  .md-comment-body {
    padding: 10px 5px;
    p {
    }
    .comment-action {
      text-align: right;
    }
  }
  .reply-comment .comment-card {
    background: #f5f5f5;
    margin-top: 5px;
  }
  .md-red {
    color: #ff5252;
  }
}
</style>
