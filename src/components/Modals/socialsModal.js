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

        <div className='size-modal'>
            <div className='size-modal-content' ref={wrapperRef}>
                <div className='size-modal-padding'>
                    <div className='size-modal-close'>
						<button onClick={() => dispatch(hideSocialsModal())}>
							<Close />
						</button>
					</div>

                    <div className='size-modal-text'>
                        <h1> Share this shoe</h1>
                    </div>

                    <div className='size-modal-buttons'>
                        <div className="Demo__some-network">
                            <FacebookShareButton
                            url={url}
                            quote={title}
                            className="Demo__some-network__share-button"
                            >
                            <FacebookIcon size={32} round />
                            </FacebookShareButton>
                        </div>

                        <div className="Demo__some-network">
                            <FacebookMessengerShareButton
                            url={url}
                            appId="521270401588372"
                            className="Demo__some-network__share-button"
                            >
                            <FacebookMessengerIcon size={32} round />
                            </FacebookMessengerShareButton>
                        </div>

                        <div className="Demo__some-network">
                            <TwitterShareButton
                            url={url}
                            title={title}
                            className="Demo__some-network__share-button"
                            >
                            <TwitterIcon size={32} round />
                            </TwitterShareButton>
                        </div>

                        <div className="Demo__some-network">
                            <WhatsappShareButton
                            url={url}
                            title={title}
                            separator=":: "
                            className="Demo__some-network__share-button"
                            >
                            <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </div>

                        <div className="Demo__some-network">
                            <LinkedinShareButton url={url} className="Demo__some-network__share-button">
                            <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                        </div>

                        <div className="Demo__some-network">
                            <PinterestShareButton
                            url={url}
                            media={image}
                            className="Demo__some-network__share-button"
                            >
                            <PinterestIcon size={32} round />
                            </PinterestShareButton>
                        </div>

                        <div className="Demo__some-network">
                            <RedditShareButton
                            url={url}
                            title={title}
                            windowWidth={660}
                            windowHeight={460}
                            className="Demo__some-network__share-button"
                            >
                            <RedditIcon size={32} round />
                            </RedditShareButton>
                        </div>

                        <div className="Demo__some-network">
                            <EmailShareButton
                            url={url}
                            subject={title}
                            body="body"
                            className="Demo__some-network__share-button"
                            >
                            <EmailIcon size={32} round />
                            </EmailShareButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}