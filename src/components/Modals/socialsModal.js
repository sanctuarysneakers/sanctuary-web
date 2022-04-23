import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { hideSocialsModal } from '../../redux/actions'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import { ReactComponent as Close } from '../../assets/images/close.svg'

import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    PinterestIcon,
    WhatsappIcon,
    RedditIcon,
    EmailIcon
  } from 'react-share';

export default function SocialsModal ({itemName, price, url, image}) {

    const dispatch = useDispatch()

    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    const title = `Check out the lowest prices for ${itemName}, available for as low as ${price}! Only on Sanctuary.`;

    return (

        <div className='socials-modal'>
            <div className='socials-modal-content' ref={wrapperRef}>
                <div className='socials-modal-padding'>
                    <div className='socials-modal-close'>
						<button onClick={() => dispatch(hideSocialsModal())}>
							<Close />
						</button>
					</div>

                    <div className='socials-modal-text'>
                        <h1> Share This Shoe</h1>
                    </div>

                    <div className='socials-modal-buttons'>
                        <div>
                            <FacebookShareButton
                            url={url}
                            quote={title}
                            >
                            <FacebookIcon size={56} round />
                            </FacebookShareButton>
                        </div>

                        <div>
                            <FacebookMessengerShareButton
                            url={url}
                            appId="780257722844724"
                            >
                            <FacebookMessengerIcon size={56} round />
                            </FacebookMessengerShareButton>
                        </div>

                        <div>
                            <TwitterShareButton
                            url={url}
                            title={title}
                            >
                            <TwitterIcon size={56} round />
                            </TwitterShareButton>
                        </div>

                        <div>
                            <WhatsappShareButton
                            url={url}
                            title={title}
                            separator=":: "
                            >
                            <WhatsappIcon size={56} round />
                            </WhatsappShareButton>
                        </div>

                        <div>
                            <LinkedinShareButton 
                                url={url}
                                summary={title}
                                source="Sanctuary"
                            >
                            <LinkedinIcon size={56} round />
                            </LinkedinShareButton>
                        </div>

                        <div>
                            <PinterestShareButton
                            url={url}
                            media={image}
                            >
                            <PinterestIcon size={56} round />
                            </PinterestShareButton>
                        </div>

                        <div>
                            <RedditShareButton
                            url={url}
                            title={title}
                            windowWidth={660}
                            windowHeight={460}
                            >
                            <RedditIcon size={56} round />
                            </RedditShareButton>
                        </div>

                        <div>
                            <EmailShareButton
                            url={url}
                            subject={title}
                            body="body"
                            >
                            <EmailIcon size={56} round />
                            </EmailShareButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}