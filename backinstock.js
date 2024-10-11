class BackInStockWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isExpanded = false; // Track whether the widget is expanded
        this.render();
    }

    // Render the widget UI
    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <style>
                :host {
                    display: block;
                    max-width: 400px; /* Maximum width for larger screens */
                    width: 100%; /* Full width for smaller screens */
                    margin: 0 auto; /* Center the widget */
                    font-family: sans-serif; /* Change to sans-serif font */
                }
                .widget {
                    background-color: white;
                    border: 1px solid #888; /* Darker gray border */
                    border-radius: 0; /* Set border radius to 0 */
                    padding: 20px;
                    transition: background-color 0.3s ease; /* Transition for background color */
                }
                .widget:hover {
                    background-color: #f0f0f0; /* Bright gray background on hover */
                }
                .title {
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 1.2em;
                    margin: 0;
                    display: flex;
                    justify-content: space-between; /* Align items */
                    align-items: center; /* Center items vertically */
                }
                .arrow {
                    margin-left: 10px;
                    width: 24px; /* Icon size */
                    height: 24px; /* Icon size */
                    fill: blue; /* Blue color for the arrow */
                    transition: transform 0.3s ease; /* Smooth transition for rotation */
                }
                .expanded {
                    margin-top: 15px;
                    transition: max-height 0.3s ease; /* Smooth transition for expansion */
                }
                input, button {
                    margin-top: 10px;
                    padding: 10px;
                    width: 100%;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 1em;
                    box-sizing: border-box;
                }
                button {
                    background-color: #6200ea; /* Material Design primary color */
                    color: white;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: #3700b3; /* Darker shade on hover */
                }
                .message {
                    margin-top: 10px;
                    color: green;
                    font-size: 0.9em;
                }
            </style>
            <div class="widget">
                <h2 class="title" id="title">
                    Notify Me When Back in Stock
                    <svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 6l-1.41 1.41L14.17 12l-5.58 5.59L10 18l6-6-6-6z"/></svg>
                </h2>
                <div class="expanded" id="expandedSection" style="display: none; opacity: 0; max-height: 0; overflow: hidden;">
                    <label for="email">Enter your email:</label>
                    <input type="email" id="email" placeholder="your-email@example.com" required />
                    <button id="submitEmail">Submit</button>
                    <div class="message" id="message"></div>
                </div>
            </div>
        `;
        this.shadowRoot.appendChild(wrapper);

        // Add click event to toggle expand/collapse
        const title = this.shadowRoot.getElementById('title');
        title.addEventListener('click', () => this.toggleExpand());

        // Add event listener for the submit button
        const submitButton = this.shadowRoot.getElementById('submitEmail');
        submitButton.addEventListener('click', () => this.submitEmail());
    }

    // Method to toggle the visibility of the expanded section
    toggleExpand() {
        const expandedSection = this.shadowRoot.getElementById('expandedSection');
        this.isExpanded = !this.isExpanded;
        expandedSection.style.display = this.isExpanded ? 'block' : 'none';
        expandedSection.style.opacity = this.isExpanded ? '1' : '0';
        expandedSection.style.maxHeight = this.isExpanded ? '200px' : '0'; // Control height for transition
        const arrow = this.shadowRoot.querySelector('.arrow');
        arrow.style.transform = this.isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'; // Rotate the arrow
    }

    // Method to handle email submission
    submitEmail() {
        const email = this.shadowRoot.getElementById('email').value;
        const messageDiv = this.shadowRoot.getElementById('message');

        // Display confirmation message
        messageDiv.textContent = `You will be notified at ${email} when the product is back in stock!`;
        // Clear the input field after submission
        this.shadowRoot.getElementById('email').value = '';
    }
}

// Register the custom element with a unique tag name
customElements.define('back-in-stock-widget', BackInStockWidget);
