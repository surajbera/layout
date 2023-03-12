const _init = () => {
	const talkToUsBtn = document.querySelector('.open-modal-btn')
	const closeModalBtn = document.querySelector('.close-modal-window')
	const bodyEl = document.querySelector('body')
	const nameInputEl = document.querySelector('.name-input')
	const cancelBtnEl = document.querySelector('.cancel-btn')
	const formContainerEl = document.querySelector('.contact-form')
	const rootElement = document.documentElement
	const siteHeading = document.querySelector('.site-desc');
	const sidebarLogo = document.querySelector('.sidebar-logo-container');
	const minWidth = 900;

	const calculateLogoOffset = () => {
		const distanceFromTop = siteHeading.getBoundingClientRect().top;
		console.log('I Ran');
		sidebarLogo.style.marginTop = `${distanceFromTop - 55}px`;
	}
	calculateLogoOffset()

	const _sendMail = (url, queryParams) => {
		return fetch(url, {
			method: "POST",
			body: JSON.stringify(queryParams),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then((response) => {
			return response.json().then((json) => {
				return json
			})
		});
	}

	const clearFormFields = () => {
		const form = document.querySelector('.contact-form');
		const inputs = form.querySelectorAll('input, textarea');

		inputs.forEach(input => {
			input.value = ''
		})
	}

	const closeModal = () => {
		bodyEl.classList.remove('modal-window-visible')
		bodyEl.classList.remove('error-sending-data')
	}

	talkToUsBtn.addEventListener('click', () => {
		bodyEl.classList.add('modal-window-visible')
		nameInputEl.focus()
	})

	closeModalBtn.addEventListener('click', () => {
		closeModal()
		bodyEl.classList.remove('form-submitted')
		calculateLogoOffset()
		clearFormFields()
	})

	cancelBtnEl.addEventListener('click', (evt) => {
		evt.preventDefault()
		clearFormFields()
		closeModal()
		calculateLogoOffset()
	})

	formContainerEl.addEventListener('submit', (evt) => {
		evt.preventDefault()
		const formData = {
			firstname: document.querySelector('#firstname').value,
			lastname: document.querySelector('#lastname').value,
			email: document.querySelector('#email').value,
			company: document.querySelector('#company').value,
			message: document.querySelector('#message').value
		}
		_sendMail('../../mail/index.php', formData).then(res => {
			bodyEl.classList.add('form-submitted')
		}).catch(err => {
			bodyEl.classList.add('error-sending-data')
		})
	})

	window.addEventListener('resize', () => {
		if (window.innerWidth >= minWidth && !bodyEl.classList.contains('modal-window-visible')) {
			calculateLogoOffset();
		}
	})
}

window.addEventListener('DOMContentLoaded', _init)
